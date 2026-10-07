// HISTORIAMOOTTORI E3: KAPPELIN KYNTTILÄT UNITYSSA (Siirtoseppä 7.10.2026; ydin Matkakirja.Linssit.Seikkailu.Kynttilat).
// - Tilan liekit (rakennus.json tilat[].liekit, DioraamaLiekit.TilanLiekit): sammunut liekki piiloon; huoneen leivottu valo himmenee
//   palavien osuuden mukaan (DioraamaLeivottu _Kirkkaus: 12 %…100 % alkuperäisestä).
// - Foggin oma kynttilä (tarjottimelta, huone 4): kantovalo leivottuun tilaan (globaalit _DioraamaKantoValo / _DioraamaKantoVari)
//   ja pieni pistevalo hahmoille.
// - Toiminto (sama nappi kuin poiminta: SeikkailuEsineet ohjaa tänne, kun esinettä ei ole): sammuta / sytytä / puhalla oma.
// - Valoisuus vartijoille ja kappalaiselle (SeikkailuVartijat lukee, kun pelaaja on kynttilöiden lähellä).
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Seikkailu;
using UnityEngine;

namespace Matkakirja.Natiivi
{
    public sealed class SeikkailuKynttilat : MonoBehaviour
    {
        public static SeikkailuKynttilat Aktiivinen { get; private set; }
        static readonly int IdKanto = Shader.PropertyToID("_DioraamaKantoValo"), IdKantoVari = Shader.PropertyToID("_DioraamaKantoVari"),
            IdKirkkaus = Shader.PropertyToID("_Kirkkaus");
        public const float LahellaM = 7f, Himmein = 0.12f;

        Kynttilat ydin;
        readonly List<(GameObject Go, Vector3 Paikka)> liekit = new List<(GameObject, Vector3)>();
        Material leivottu; float kirkkausAlku = 1f;
        Light omaValo;
        Action<string> kirjaa;
        public string TilaId { get; private set; }
        public Kynttilat Ydin => ydin;

        public static SeikkailuKynttilat Luo(Transform isa, string tilaId, DioraamaLiekit liekitLahde, DioraamaRakennus rakennus3D, Action<string> kirjaa)
        {
            Poista();
            if (liekitLahde == null) { kirjaa?.Invoke("seikkailu: kynttilät: liekit puuttuvat"); return null; }
            var go = new GameObject("Seikkailu kynttilät");
            go.transform.SetParent(isa, false);
            var k = go.AddComponent<SeikkailuKynttilat>();
            k.kirjaa = kirjaa; k.TilaId = tilaId;
            k.liekit.AddRange(liekitLahde.TilanLiekit(tilaId));
            var paikat = new List<(double, double, double)>();
            foreach (var l in k.liekit) paikat.Add((l.Paikka.x, l.Paikka.y, l.Paikka.z));
            k.ydin = new Kynttilat(paikat);
            k.leivottu = rakennus3D?.LeivottuMateriaali(tilaId);
            if (k.leivottu != null && k.leivottu.HasProperty(IdKirkkaus)) k.kirkkausAlku = k.leivottu.GetFloat(IdKirkkaus);
            Aktiivinen = k;
            kirjaa?.Invoke($"seikkailu: kynttilät {tilaId}: {k.ydin.Maara} kpl, leivottu valo {(k.leivottu != null ? "kyllä" : "ei")}");
            return k;
        }

        /// <summary>Onko piste kynttilöiden huoneessa (lähin kynttilä LahellaM:n sisällä).</summary>
        public bool Lahella(Vector3 p)
        {
            foreach (var l in liekit) if ((l.Paikka - p).sqrMagnitude < LahellaM * LahellaM) return true;
            return false;
        }

        public double Valoisuus(Vector3 p, Vector3? oma) => ydin.Valoisuus(p.x, p.y, p.z, oma is Vector3 o ? (o.x, o.y, o.z) : ((double, double, double)?)null);

        /// <summary>Toiminto pelaajan kohdalla (SeikkailuEsineet ohjaa tänne). Palauttaa, tehtiinkö jotain.</summary>
        public bool Toimi(SeikkailuPelaaja p)
        {
            var c = p.transform.position + Vector3.up * 1.0f;
            var t = ydin.Valitse(c.x, c.y, c.z);
            if (t.Toiminto == KynttilaToiminto.Ei) return false;
            ydin.Tee(t);
            kirjaa?.Invoke($"seikkailu: kynttilä {t.Toiminto} {t.Indeksi} (palavia {ydin.Palavia}/{ydin.Maara}, oma {(ydin.OmaPalaa ? "palaa" : "ei")})");
            return true;
        }

        /// <summary>Onko toiminto tarjolla (nappi näkyviin).</summary>
        public bool ToimintoTarjolla(SeikkailuPelaaja p)
        {
            if (p == null) return false;
            var c = p.transform.position + Vector3.up * 1.0f;
            return ydin.Valitse(c.x, c.y, c.z).Toiminto != KynttilaToiminto.Ei && (Lahella(c) || ydin.OmaPalaa);
        }

        void Update()
        {
            for (int i = 0; i < liekit.Count; i++)
                if (liekit[i].Go != null && liekit[i].Go.activeSelf != ydin.Palaa(i)) liekit[i].Go.SetActive(ydin.Palaa(i));
            if (leivottu != null) leivottu.SetFloat(IdKirkkaus, kirkkausAlku * Mathf.Lerp(Himmein, 1f, (float)ydin.Osuus));
            var p = SeikkailuPelaaja.Aktiivinen;
            bool oma = ydin.OmaPalaa && p != null;
            if (oma)
            {
                var kasi = p.Hahmo.TransformPoint(new Vector3(0.22f, 1.15f, 0.3f));
                float lepatus = 0.9f + 0.1f * Mathf.PerlinNoise(Time.time * 6f, 0.3f);
                Shader.SetGlobalVector(IdKanto, new Vector4(kasi.x, kasi.y, kasi.z, (float)Kynttilat.OmaValoM));
                Shader.SetGlobalVector(IdKantoVari, new Vector4(1f, 0.72f, 0.42f, 0.95f * lepatus));
                if (omaValo == null)
                {
                    var g = new GameObject("Oma kynttilä");
                    omaValo = g.AddComponent<Light>();
                    omaValo.type = LightType.Point; omaValo.range = (float)Kynttilat.OmaValoM; omaValo.color = new Color(1f, 0.72f, 0.42f);
                    omaValo.shadows = LightShadows.None;
                }
                omaValo.transform.position = kasi; omaValo.intensity = 1.4f * lepatus; omaValo.enabled = true;
            }
            else
            {
                Shader.SetGlobalVector(IdKanto, Vector4.zero);
                if (omaValo != null) omaValo.enabled = false;
            }
        }

        public static void Poista() { var a = Aktiivinen; Aktiivinen = null; if (a != null) Destroy(a.gameObject); }

        void OnDestroy()
        {
            if (Aktiivinen == this) Aktiivinen = null;
            Shader.SetGlobalVector(IdKanto, Vector4.zero);
            if (leivottu != null) leivottu.SetFloat(IdKirkkaus, kirkkausAlku);
            foreach (var l in liekit) if (l.Go != null) l.Go.SetActive(true);
            if (omaValo != null) Destroy(omaValo.gameObject);
        }
    }
}
