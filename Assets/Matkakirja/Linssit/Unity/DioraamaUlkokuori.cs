// DIORAAMAN ULKOKUORI JA LAATUTASOT (Olavinlinna uudella tavalla, Siirtoseppä 29.9.2026; omistajan toive 19.4x
// Päätoimittajan kautta: "laatutaso laitteen mukaan"). Malli: Senaatti-kiinteistöt – Senate Properties, CC BY 4.0
// (Linnanrakentajan Blender-putki: vesi poistettu, origo saaren keskellä, vesi y −7, sama kehys kuin tiloilla).
//
// TASOT (Rakennus.Ulkokuori: huippu 1,35 M / normaali 400 k / kevyt 150 k kolmiota, tekstuuri JPEG glb:n sisällä):
//   HUIPPU   laitteen muisti ≥ 7 Gt (A17 Pro ja uudemmat iPhonet, M-sarjan iPadit)
//   NORMAALI muisti ≥ 3,5 Gt
//   KEVYT    muut
// Kehittäjän valinta ("poikki kuori auto|huippu|normaali|kevyt") ohittaa automaattisen ja muistetaan laitteeseen.
//
// LATAUSJÄRJESTYS: ensin nopea taso näkyviin (HUIPPU-laitteella normaali), sitten kevyt kaukotasoksi (LODGroup LOD1,
// ei koskaan karsita), ja HUIPPU-laitteella lopuksi huippu taustalla LOD0:n tilalle (korvaa ajonaikaisesti luoduille
// tekstuureille mahdottoman mipmap-streamingin). glb jäsennetään ja kärkitaulukot kootaan taustasäikeessä; vain
// Mesh- ja tekstuurikutsut pääsäikeessä. Tekstuuri: LoadImage (sRGB, mipmapit) → Compress (GPU-muoto, ei RGBA32:ta
// muistiin). Virhe ei kaada linssiä: taso jää pois ja edellinen jää näkyviin.
using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Matkakirja.Linssit.Dioraama;
using UnityEngine;
using UnityEngine.Networking;
using UnityEngine.Rendering;

namespace Matkakirja.Natiivi
{
    public sealed class DioraamaUlkokuori
    {
        public enum Laatu { Kevyt = 0, Normaali = 1, Huippu = 2 }
        const string PakotusAvain = "dioraama-kuori-taso";
        const float LahiRaja = 0.28f; // LOD0 → LOD1, kun kuori vie alle 28 % ruudun korkeudesta
        static readonly int IdKuva = Shader.PropertyToID("_Kuva");

        /// <summary>Kehittäjän pakottama taso tai null (automaattinen). Muistetaan PlayerPrefsiin.</summary>
        public static Laatu? Pakotettu
        {
            get { int v = PlayerPrefs.GetInt(PakotusAvain, -1); return v >= 0 && v <= 2 ? (Laatu?)v : null; }
            set { PlayerPrefs.SetInt(PakotusAvain, value.HasValue ? (int)value.Value : -1); PlayerPrefs.Save(); PakotusVaihtui?.Invoke(); }
        }

        /// <summary>Kehittäjän valinta muuttui (DioraamaSovitin lataa kuoren uudelleen, DioraamaTaulu päivittää napin).</summary>
        public static event Action PakotusVaihtui;

        /// <summary>Kehittäjätilan nappi: auto → huippu → normaali → kevyt → auto.</summary>
        public static void SeuraavaPakotus() =>
            Pakotettu = Pakotettu == null ? Laatu.Huippu : Pakotettu == Laatu.Huippu ? Laatu.Normaali : Pakotettu == Laatu.Normaali ? Laatu.Kevyt : (Laatu?)null;

        /// <summary>Napin teksti: "Kuori: auto (huippu)" tai "Kuori: normaali".</summary>
        public static string ValintaTeksti() =>
            "Kuori: " + (Pakotettu.HasValue ? Pakotettu.Value.ToString().ToLowerInvariant() : "auto (" + Automaattinen().ToString().ToLowerInvariant() + ")");

        /// <summary>Laitteen mukainen taso (SystemInfo.systemMemorySize, Mt).</summary>
        public static Laatu Automaattinen()
        {
            int mt = SystemInfo.systemMemorySize;
            return mt >= 7000 ? Laatu.Huippu : mt >= 3500 ? Laatu.Normaali : Laatu.Kevyt;
        }

        public static Laatu Valittu => Pakotettu ?? Automaattinen();

        readonly Transform juuri;
        readonly Shader varjostin;
        GameObject go;
        LODGroup lodit;
        readonly GameObject[] tasoGo = new GameObject[3];
        readonly Texture2D[] tasoKuva = new Texture2D[3];
        readonly Material[] tasoMat = new Material[3];
        int kerta;

        public DioraamaUlkokuori(Transform juuri)
        {
            this.juuri = juuri;
            varjostin = Resources.Load<Shader>("Varjostimet/DioraamaKuori");
        }

        /// <summary>Näkyvä lähitaso (LOD0) tai null.</summary>
        public Laatu? Lahitaso { get; private set; }
        public int Kolmiot { get; private set; }

        public string Kuvaus()
        {
            string lahi = Lahitaso?.ToString().ToLowerInvariant() ?? "ei ladattu";
            return $"kuori {lahi} (valinta {(Pakotettu.HasValue ? Pakotettu.Value.ToString().ToLowerInvariant() : "auto → " + Automaattinen().ToString().ToLowerInvariant())}, " +
                   $"muisti {SystemInfo.systemMemorySize} Mt, {SystemInfo.deviceModel}), kaukotaso {(tasoGo[0] != null && Lahitaso != Laatu.Kevyt ? "kevyt" : "-")}, {Kolmiot} kolmiota";
        }

        /// <summary>Lataa kuoren valitulla tasolla. url = paketin polku → haettava osoite (peili mukana).</summary>
        public IEnumerator Lataa(Ulkokuori kuori, Func<string, string> url, Action<string> kirjaa, bool hamara = false)
        {
            Tyhjenna();
            if (kuori == null) yield break;
            if (varjostin == null) { kirjaa?.Invoke("poikki: DioraamaKuori-varjostin puuttuu"); yield break; }
            int oma = ++kerta;
            go = new GameObject("Ulkokuori") { layer = DioraamaNayttamo.Kerros };
            go.transform.SetParent(juuri, false);
            lodit = go.AddComponent<LODGroup>();

            Laatu tavoite = Valittu;
            string Polku(Laatu l) => l == Laatu.Huippu ? kuori.Huippu : l == Laatu.Normaali ? kuori.Normaali : kuori.Kevyt;
            // Hämärä (DioraamaTunnelma): omat tekstuurit samaan UV:hen; puuttuva hämärätaso → päiväversio.
            string AstcPaiva(Laatu l) => l == Laatu.Huippu ? kuori.AstcHuippu : l == Laatu.Normaali ? kuori.AstcNormaali : kuori.AstcKevyt;
            string AstcHamara(Laatu l) => l == Laatu.Huippu ? kuori.HamaraHuippu : l == Laatu.Normaali ? kuori.HamaraNormaali : kuori.HamaraKevyt;
            string JpgHamara(Laatu l) => l == Laatu.Huippu ? kuori.HamaraJpgHuippu : l == Laatu.Normaali ? kuori.HamaraJpgNormaali : kuori.HamaraJpgKevyt;
            string AstcPolku(Laatu l) => hamara && !string.IsNullOrEmpty(AstcHamara(l)) ? AstcHamara(l) : AstcPaiva(l);
            // Nopea ensimmäinen taso: HUIPPU-laitteellakin normaali ensin, ettei 66 Mt:n lataus pidä kuorta poissa.
            var jarjestys = new List<Laatu>();
            Laatu ensin = tavoite == Laatu.Huippu && !string.IsNullOrEmpty(kuori.Normaali) ? Laatu.Normaali : tavoite;
            jarjestys.Add(ensin);
            if (ensin != Laatu.Kevyt) jarjestys.Add(Laatu.Kevyt);
            if (tavoite == Laatu.Huippu && ensin != Laatu.Huippu) jarjestys.Add(Laatu.Huippu);

            foreach (var taso in jarjestys)
            {
                string polku = Polku(taso);
                if (string.IsNullOrEmpty(polku)) { kirjaa?.Invoke($"poikki: kuori {taso} puuttuu paketista"); continue; }
                byte[] tavut = null;
                float alku = Time.realtimeSinceStartup;
                using (var p = UnityWebRequest.Get(url(polku)))
                {
                    p.timeout = 180;
                    yield return p.SendWebRequest();
                    if (p.result == UnityWebRequest.Result.Success) tavut = p.downloadHandler.data;
                }
                if (oma != kerta) yield break;
                if (tavut == null) { kirjaa?.Invoke($"poikki: kuori {taso} ei latautunut"); continue; }

                // Jäsennys ja kärkitaulukot taustasäikeessä.
                Koottu koottu = null; string virhe = null;
                var tehtava = Task.Run(() => { try { koottu = Kokoa(DioraamaGlb.Lue(tavut, true)); } catch (Exception e) { virhe = e.Message; } });
                while (!tehtava.IsCompleted) yield return null;
                tavut = null;
                if (oma != kerta) yield break;
                if (koottu == null) { kirjaa?.Invoke($"poikki: kuori {taso} virhe: {virhe}"); continue; }

                var mesh = new Mesh { name = "Ulkokuori:" + taso, indexFormat = IndexFormat.UInt32 };
                mesh.SetVertices(koottu.Paikat);
                mesh.SetUVs(0, koottu.Uv);
                mesh.SetTriangles(koottu.Kolmiot, 0);
                mesh.RecalculateBounds();
                mesh.UploadMeshData(true); // kärjet vain GPU:lle, CPU-kopio vapautuu

                // ASTC-mipketju (tekstuurit.<taso>) ensin: 4×4 on laadultaan lähes JPEG (PSNR ≈ 40 dB) ja jää GPU:lle
                // pakattuna; puuttuva tai tukematon → glb:n JPEG ja Compress kuten ennen.
                Texture2D kuva = null;
                string astc = AstcPolku(taso);
                if (!string.IsNullOrEmpty(astc))
                {
                    byte[] astcTavut = null;
                    using (var p = UnityWebRequest.Get(url(astc)))
                    {
                        p.timeout = 120;
                        yield return p.SendWebRequest();
                        if (p.result == UnityWebRequest.Result.Success) astcTavut = p.downloadHandler.data;
                    }
                    if (oma != kerta) { UnityEngine.Object.Destroy(mesh); yield break; }
                    kuva = DioraamaAstc.Lue(astcTavut, "Ulkokuori:" + taso + ":astc", out string syy);
                    if (kuva == null) kirjaa?.Invoke($"poikki: kuori {taso} ASTC ei käytössä ({(astcTavut == null ? "ei latautunut" : syy)}), JPEG varalla");
                }
                if (kuva == null && hamara && !string.IsNullOrEmpty(JpgHamara(taso)))
                {
                    byte[] jpg = null;
                    using (var p = UnityWebRequest.Get(url(JpgHamara(taso))))
                    {
                        p.timeout = 120;
                        yield return p.SendWebRequest();
                        if (p.result == UnityWebRequest.Result.Success) jpg = p.downloadHandler.data;
                    }
                    if (oma != kerta) { UnityEngine.Object.Destroy(mesh); yield break; }
                    if (jpg != null) koottu.Kuva = jpg; // sama JPEG-polku alla
                    else kirjaa?.Invoke($"poikki: kuori {taso} hämärä-JPEG ei latautunut, päivätekstuuri");
                }
                if (kuva == null && koottu.Kuva != null)
                {
                    kuva = new Texture2D(2, 2, TextureFormat.RGBA32, true, false)
                    { name = "Ulkokuori:" + taso, filterMode = FilterMode.Trilinear, wrapMode = TextureWrapMode.Clamp, anisoLevel = 4 };
                    if (kuva.LoadImage(koottu.Kuva, false)) kuva.Compress(true);
                    else { UnityEngine.Object.Destroy(kuva); kuva = null; kirjaa?.Invoke($"poikki: kuori {taso} tekstuuri ei jäsentynyt"); }
                    if (kuva != null) kuva.Apply(false, true); // tekstuuri vain GPU:lle
                }
                if (oma != kerta) { UnityEngine.Object.Destroy(mesh); if (kuva != null) UnityEngine.Object.Destroy(kuva); yield break; }

                AsetaTaso(taso, mesh, kuva);
                kirjaa?.Invoke($"poikki: kuori {taso.ToString().ToLowerInvariant()} valmis ({koottu.Kolmiot.Length / 3} kolmiota, " +
                               $"{(kuva != null ? kuva.width + "² " + kuva.format : "ei kuvaa")}, {Time.realtimeSinceStartup - alku:F1} s)");
                yield return null;
            }
        }

        static readonly int IdLeikkausMin = Shader.PropertyToID("_DioraamaLeikkausMin"),
            IdLeikkausMax = Shader.PropertyToID("_DioraamaLeikkausMax"), IdLeikkausKamera = Shader.PropertyToID("_DioraamaLeikkausKamera");

        /// <summary>
        /// Leikkausikkuna (speksi dioraama-rajapinnat-blender kohta 3) joka ruutu: tilan rajat (tai leikkaus.min/max)
        /// Unity-avaruuteen, laajennus metreinä, kutistus keskipisteeseen osuudella 0…1 (kasvu kaarilennolla), ja kameran
        /// paikka jatketta varten. Osuus 0 = kuori ehjä (varjostin ei tee mitään).
        /// </summary>
        public void PaivitaLeikkaus(Rakennus rakennus, (string tila, double osuus) leikkaus, Camera kamera)
        {
            var t = leikkaus.tila != null && leikkaus.osuus > 0 ? rakennus?.Tilat?.Find(x => x.Id == leikkaus.tila) : null;
            if (t == null || go == null) { Shader.SetGlobalVector(IdLeikkausMin, Vector4.zero); return; }
            var a = DioraamaNayttamo.UnityPiste(t.LeikkausMin ?? t.RajaMin);
            var b = DioraamaNayttamo.UnityPiste(t.LeikkausMax ?? t.RajaMax);
            float laajennus = (float)t.LeikkausLaajennus, osuus = Mathf.Clamp01((float)leikkaus.osuus);
            // Alaspäin vain 0,2 m (1.0.55-kuvat): täysi laajennus kaivoi kallion lattian alta ja järvi näkyi tilan alla.
            Vector3 lo = Vector3.Min(a, b) - new Vector3(laajennus, Mathf.Min(laajennus, 0.2f), laajennus), hi = Vector3.Max(a, b) + Vector3.one * laajennus;
            Vector3 keski = (lo + hi) * 0.5f, puoli = (hi - lo) * 0.5f * osuus;
            lo = keski - puoli; hi = keski + puoli;
            Shader.SetGlobalVector(IdLeikkausMin, new Vector4(lo.x, lo.y, lo.z, osuus));
            Shader.SetGlobalVector(IdLeikkausMax, new Vector4(hi.x, hi.y, hi.z, t.LeikkausKameraan ? 1f : 0f));
            var k = kamera != null ? kamera.transform.position : keski;
            Shader.SetGlobalVector(IdLeikkausKamera, new Vector4(k.x, k.y, k.z, 0));
        }

        GameObject vesi;

        /// <summary>
        /// Järvi kuoren alle (Päätoimittaja 29.9.: "vesi puuttuu, saari leijuu"): 4 km:n neliö korkeudella y rakennuksen
        /// omalla vesipinnalla (DioraamaRakennus.PinnanMateriaali "vesi": Codexin maalattu kuva, virtaus, sumu). UV =
        /// maailman xz / toisto (8 m kuten rakennuskoneen tasoprojektiossa), COLOR = AO 1, lämpö 0.
        /// </summary>
        public void LisaaVesi(Material materiaali, float y, float toistoM)
        {
            if (vesi != null) { var vmf = vesi.GetComponent<MeshFilter>(); if (vmf != null) UnityEngine.Object.Destroy(vmf.sharedMesh); UnityEngine.Object.Destroy(vesi); }
            vesi = null;
            if (materiaali == null) return;
            const float R = 2000f;
            float t = 1f / Mathf.Max(0.5f, toistoM);
            var m = new Mesh { name = "Ulkokuori:vesi" };
            m.SetVertices(new[] { new Vector3(-R, y, -R), new Vector3(-R, y, R), new Vector3(R, y, R), new Vector3(R, y, -R) });
            m.SetNormals(new[] { Vector3.up, Vector3.up, Vector3.up, Vector3.up });
            m.SetUVs(0, new[] { new Vector2(-R * t, -R * t), new Vector2(-R * t, R * t), new Vector2(R * t, R * t), new Vector2(R * t, -R * t) });
            var c = new Color32(255, 0, 0, 255);
            m.SetColors(new[] { c, c, c, c });
            m.SetTriangles(new[] { 0, 1, 2, 0, 2, 3 }, 0);
            m.RecalculateBounds();
            vesi = new GameObject("Ulkokuori:vesi") { layer = DioraamaNayttamo.Kerros };
            vesi.transform.SetParent(juuri, false);
            vesi.AddComponent<MeshFilter>().sharedMesh = m;
            var r = vesi.AddComponent<MeshRenderer>();
            r.sharedMaterial = materiaali;
            r.shadowCastingMode = ShadowCastingMode.Off;
            r.receiveShadows = true;
        }

        sealed class Koottu
        {
            public Vector3[] Paikat;
            public Vector2[] Uv;
            public int[] Kolmiot;
            public byte[] Kuva;
        }

        static Koottu Kokoa(GlbMalli malli)
        {
            int kv = 0, ki = 0;
            foreach (var o in malli.Osat) { kv += o.Paikat.Length / 3; ki += o.Kolmiot.Length; }
            var k = new Koottu { Paikat = new Vector3[kv], Uv = new Vector2[kv], Kolmiot = new int[ki] };
            int v0 = 0, i0 = 0, kuvaI = -1;
            foreach (var o in malli.Osat)
            {
                int n = o.Paikat.Length / 3;
                for (int i = 0; i < n; i++)
                {
                    k.Paikat[v0 + i] = new Vector3(o.Paikat[i * 3], o.Paikat[i * 3 + 1], o.Paikat[i * 3 + 2]);
                    // glTF:n UV-origo on vasen yläkulma, Unityn vasen alakulma.
                    k.Uv[v0 + i] = o.Uv != null && o.Uv.Length >= (i + 1) * 2 ? new Vector2(o.Uv[i * 2], 1f - o.Uv[i * 2 + 1]) : Vector2.zero;
                }
                for (int i = 0; i < o.Kolmiot.Length; i++) k.Kolmiot[i0 + i] = o.Kolmiot[i] + v0;
                if (kuvaI < 0) kuvaI = o.Kuva;
                v0 += n; i0 += o.Kolmiot.Length;
            }
            if (kuvaI >= 0 && kuvaI < malli.Kuvat.Count) k.Kuva = malli.Kuvat[kuvaI];
            return k;
        }

        void AsetaTaso(Laatu taso, Mesh mesh, Texture2D kuva)
        {
            int i = (int)taso;
            PoistaTaso(i);
            var m = new Material(varjostin) { name = "Ulkokuori:" + taso };
            if (kuva != null) m.SetTexture(IdKuva, kuva);
            var t = new GameObject("Kuori:" + taso) { layer = DioraamaNayttamo.Kerros };
            t.transform.SetParent(go.transform, false);
            t.AddComponent<MeshFilter>().sharedMesh = mesh;
            var r = t.AddComponent<MeshRenderer>();
            r.sharedMaterial = m;
            r.shadowCastingMode = ShadowCastingMode.Off;
            r.receiveShadows = false;
            tasoGo[i] = t; tasoKuva[i] = kuva; tasoMat[i] = m;
            // Uusi lähitaso korvaa kevyemmän lähitason (normaali → huippu); kevyt jää vain kaukotasoksi.
            if (taso != Laatu.Kevyt || Lahitaso == null)
            {
                if (Lahitaso.HasValue && Lahitaso.Value != Laatu.Kevyt && Lahitaso.Value != taso) PoistaTaso((int)Lahitaso.Value);
                Lahitaso = taso;
            }
            PaivitaLodit();
        }

        void PaivitaLodit()
        {
            if (lodit == null || Lahitaso == null) return;
            var lahi = tasoGo[(int)Lahitaso.Value];
            var kauko = Lahitaso.Value != Laatu.Kevyt ? tasoGo[(int)Laatu.Kevyt] : null;
            Kolmiot = 0;
            foreach (var t in tasoGo) if (t != null) Kolmiot += (int)(t.GetComponent<MeshFilter>().sharedMesh.GetIndexCount(0) / 3);
            if (kauko == null) lodit.SetLODs(new[] { new LOD(0f, new Renderer[] { lahi.GetComponent<Renderer>() }) });
            else lodit.SetLODs(new[]
            {
                new LOD(LahiRaja, new Renderer[] { lahi.GetComponent<Renderer>() }),
                new LOD(0f, new Renderer[] { kauko.GetComponent<Renderer>() }),
            });
            lodit.RecalculateBounds();
        }

        void PoistaTaso(int i)
        {
            if (tasoGo[i] != null)
            {
                var mf = tasoGo[i].GetComponent<MeshFilter>();
                if (mf != null && mf.sharedMesh != null) UnityEngine.Object.Destroy(mf.sharedMesh);
                UnityEngine.Object.Destroy(tasoGo[i]);
            }
            if (tasoKuva[i] != null) UnityEngine.Object.Destroy(tasoKuva[i]);
            if (tasoMat[i] != null) UnityEngine.Object.Destroy(tasoMat[i]);
            tasoGo[i] = null; tasoKuva[i] = null; tasoMat[i] = null;
        }

        public void Tyhjenna()
        {
            kerta++;
            Shader.SetGlobalVector(IdLeikkausMin, Vector4.zero);
            for (int i = 0; i < 3; i++) PoistaTaso(i);
            if (go != null) UnityEngine.Object.Destroy(go);
            go = null; lodit = null; Lahitaso = null; Kolmiot = 0;
            LisaaVesi(null, 0, 1);
        }
    }
}
