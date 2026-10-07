// HISTORIAMOOTTORI E3: KAPPELIN KYNTTILÄT UNITYSSA (Siirtoseppä 7.10.2026; ydin Matkakirja.Linssit.Seikkailu.Kynttilat).
// - Tilan liekit (rakennus.json tilat[].liekit, DioraamaLiekit.TilanLiekit): sammunut liekki piiloon; huoneen leivottu valo himmenee
//   palavien osuuden mukaan (DioraamaLeivottu _Kirkkaus: 12 %…100 % alkuperäisestä).
// - Foggin oma kynttilä (tarjottimelta, huone 4): kantovalo leivottuun tilaan (globaalit _DioraamaKantoValo / _DioraamaKantoVari)
//   ja pieni pistevalo hahmoille.
// - Toiminto (sama nappi kuin poiminta: SeikkailuEsineet ohjaa tänne, kun esinettä ei ole): sammuta / sytytä / puhalla oma.
// - Valoisuus vartijoille ja kappalaiselle (SeikkailuVartijat lukee, kun pelaaja on kynttilöiden lähellä).
using System;
using System.Collections;
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
        GameObject omaLiekki;
        DioraamaLiekit liekitLahde;
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
            k.kirjaa = kirjaa; k.TilaId = tilaId; k.liekitLahde = liekitLahde;
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

        /// <summary>Liekkien paikat (Unity) Ytimen indeksijärjestyksessä (E3a: kappalaisen sammutusjärjestys).</summary>
        public IEnumerable<Vector3> LiekkiPaikat() { foreach (var l in liekit) yield return l.Paikka; }

        /// <summary>Onko piste kynttilöiden huoneessa (lähin kynttilä LahellaM:n sisällä).</summary>
        public bool Lahella(Vector3 p)
        {
            foreach (var l in liekit) if ((l.Paikka - p).sqrMagnitude < LahellaM * LahellaM) return true;
            return false;
        }

        public double Valoisuus(Vector3 p, Vector3? oma) => ydin.Valoisuus(p.x, p.y, p.z, oma is Vector3 o ? (o.x, o.y, o.z) : ((double, double, double)?)null);

        // --- E3d: ikuinen valo (vaihe 8) ja rautaluukku + virtaus (vaihe 4). Paikat merkeistä valo:ikuinen ja luukku:koillinen;
        // puuttuessa PAIKKAMERKIT (Päätoimittaja 7.10. 17.5x: vaihdetaan, kun Linnanrakentajan peili päivittyy). ---
        public bool LuukkuAuki { get; private set; }
        public Vector3 IkuinenValo { get; private set; }
        public Vector3 Luukku { get; private set; }
        public Vector3 Portaikko { get; private set; }
        public bool Paikkamerkit { get; private set; }
        Light ikuinenValoLight, yovalo; AudioSource tuuli; Transform sarana; float saranaKulma;
        readonly List<UnityEngine.Object> luodut = new List<UnityEngine.Object>();
        /// <summary>Luukun avauskulma (Unity y, astetta): glTF:n negatiivinen y-kierto aukaisee sisään kappeliin.</summary>
        public const float LuukkuAuki0 = 95f;
        public const float SytytysM = 1.0f, LuukkuM = 1.2f, LuukkuSammuuM = 1.0f, PortaikkoSammuuM = 1.2f;

        void AsetaPaikat()
        {
            var d = SeikkailuKavely.Data;
            KavelyMerkki M(string n) { if (d != null) foreach (var m in d.Merkit) if (m.Nimi == n) return m; return null; }
            Vector3? Merkki(string n) => M(n) is KavelyMerkki m ? new Vector3((float)m.X, (float)m.Y, (float)-m.Z) : (Vector3?)null;
            var ovi = Merkki("ovi:kappeli-alku") ?? (liekit.Count > 0 ? liekit[0].Paikka : Vector3.zero);
            // Alttari = reitin viimeinen piste (kappalainen-5), muuten liekkien keskipiste.
            Vector3 alttari = Merkki("reitti:kappalainen-5") ?? Keski();
            var keskus = (ovi + alttari) * 0.5f;
            // Veto vie kaari-oven portaikkoon (savupiippu): v44i ovi:kaari-ovi (portaikon alapää), muuten tuloovi.
            Portaikko = Merkki("ovi:kaari-ovi") ?? ovi;
            var iv = Merkki("valo:ikuinen"); var lk = Merkki("luukku:koillinen");
            Paikkamerkit = iv == null || lk == null;
            IkuinenValo = iv ?? alttari + Vector3.up * 1.8f + (keskus - alttari).normalized * 0.6f;
            // Koillinen: glTF x itä, z etelä → koillinen (+x, −z glTF) = Unity (+x, +z); seinälle 3,6 m keskuksesta, 1,6 m lattiasta.
            Luukku = lk ?? new Vector3(keskus.x, ovi.y + 1.6f, keskus.z) + new Vector3(0.707f, 0f, 0.707f) * 3.6f;
            var g = new GameObject("Ikuinen valo"); g.transform.SetParent(transform, false); g.transform.position = IkuinenValo;
            ikuinenValoLight = g.AddComponent<Light>(); ikuinenValoLight.type = LightType.Point; ikuinenValoLight.range = 1.6f;
            ikuinenValoLight.intensity = 0.5f; ikuinenValoLight.color = new Color(1f, 0.6f, 0.3f); ikuinenValoLight.shadows = LightShadows.None;
            if (liekitLahde != null) { var lt = liekitLahde.LuoLyhty(g.transform); if (lt != null) lt.transform.localPosition = iv != null ? Vector3.up * 0.06f : Vector3.zero; }
            // Linnanrakentajan mallit (v44i): riippulamppu ja rautaluukku saranansa ympäri kääntyvänä.
            if (M("valo:ikuinen") is KavelyMerkki ivm) StartCoroutine(SeikkailuEsineet.LataaMalli(ivm, transform, luodut, _ => { }, kirjaa));
            if (M("luukku:koillinen") is KavelyMerkki lkm)
            {
                var sp = lkm.Sarana != null ? new Vector3((float)lkm.Sarana[0], (float)lkm.Sarana[1], (float)-lkm.Sarana[2]) : Luukku;
                sarana = new GameObject("Luukun sarana").transform; sarana.SetParent(transform, false); sarana.position = sp;
                StartCoroutine(SeikkailuEsineet.LataaMalli(lkm, sarana, luodut, _ => { }, kirjaa));
            }
            var yg = new GameObject("Yövalo luukusta"); yg.transform.SetParent(transform, false);
            var sisaan = new Vector3(keskus.x - Luukku.x, 0f, keskus.z - Luukku.z).normalized;
            yg.transform.position = Luukku + sisaan * 0.6f;
            yovalo = yg.AddComponent<Light>(); yovalo.type = LightType.Point; yovalo.range = 3f; yovalo.color = new Color(0.55f, 0.65f, 0.9f);
            yovalo.intensity = 0f; yovalo.shadows = LightShadows.None;
            kirjaa?.Invoke($"seikkailu: kappeli: ikuinen valo {IkuinenValo}, luukku {Luukku}{(Paikkamerkit ? " (paikkamerkit)" : "")}");
        }

        Vector3 Keski() { var v = Vector3.zero; foreach (var l in liekit) v += l.Paikka; return liekit.Count > 0 ? v / liekit.Count : Vector3.zero; }

        /// <summary>Luukku auki/kiinni (narahdus tai kolahdus kuuluu voudille tavallisena äänenä).</summary>
        public void VaihdaLuukku()
        {
            LuukkuAuki = !LuukkuAuki;
            SeikkailuAanet.Soita(LuukkuAuki ? "luukku-narahdus" : "luukku-kolahdus", Luukku);
            LuukkuAani?.Invoke(Luukku);
            kirjaa?.Invoke($"seikkailu: luukku {(LuukkuAuki ? "auki" : "kiinni")}");
        }
        public static event Action<Vector3> LuukkuAani;

        /// <summary>Luukku ulottuvilla: vaakaetäisyys alle LuukkuM ja luukku enintään 1,2 m käden (1 m lattiasta) yläpuolella.</summary>
        bool LuukullaOn(Vector3 c) { var v = Luukku - c; float dy = v.y; v.y = 0; return v.magnitude < LuukkuM && dy > -0.6f && dy < 1.2f; }

        // --- E3d: kynttilän asetus alttaripöydälle seinän viereen (vaihe 6 "Saumat") ---
        /// <summary>Foggin kynttilä asetettuna (paikka) tai null (kädessä).</summary>
        public Vector3? OmaAsetettu { get; private set; }
        public const float AsetusM = 0.9f, KasiSaumaM = 0.5f;

        static Vector3? OnttoPaikka()
        {
            var d = SeikkailuKavely.Data; if (d == null) return null;
            foreach (var m in d.Lajia("ontto")) return new Vector3((float)m.X, (float)m.Y, (float)-m.Z);
            return null;
        }

        /// <summary>Saumat erottuvat viistovalossa: palava kynttilä asetettuna ≤ 0,9 m ontosta kohdasta tai kädessä ≤ 0,5 m (käsikirjoitus kohta 6).</summary>
        public bool SaumatNakyvat
        {
            get
            {
                if (!ydin.OmaPalaa || !(OnttoPaikka() is Vector3 o)) return false;
                if (OmaAsetettu is Vector3 a) return Vector3.Distance(a, o) <= AsetusM;
                var p = SeikkailuPelaaja.Aktiivinen;
                return p != null && Vector3.Distance(p.Hahmo.TransformPoint(new Vector3(0.22f, 1.15f, 0.3f)), o) <= KasiSaumaM;
            }
        }

        /// <summary>Toiminto pelaajan kohdalla (SeikkailuEsineet ohjaa tänne). Palauttaa, tehtiinkö jotain.</summary>
        public bool Toimi(SeikkailuPelaaja p)
        {
            var c = p.transform.position + Vector3.up * 1.0f;
            if (LuukullaOn(c)) { VaihdaLuukku(); return true; }
            if (ydin.OmaKynttila && !ydin.OmaPalaa && OmaAsetettu == null && Vector3.Distance(c + Vector3.up * 0.4f, IkuinenValo) < SytytysM + 0.6f)
            {
                ydin.AsetaOma(true); SeikkailuAanet.Soita("sytytys", IkuinenValo, 0.7f);
                kirjaa?.Invoke("seikkailu: kynttilä sytytetty ikuisesta valosta");
                return true;
            }
            // Asetettu kynttilä lähellä → takaisin käteen; palava oma kynttilä ontolla kohdalla → asetetaan pöydälle seinän viereen.
            if (OmaAsetettu is Vector3 asp && Vector3.Distance(asp, c) < 1.2f) { OmaAsetettu = null; kirjaa?.Invoke("seikkailu: kynttilä otettu käteen"); return true; }
            if (OmaAsetettu == null && ydin.OmaPalaa && OnttoPaikka() is Vector3 op && Vector3.Distance(op, c) < 1.3f)
            {
                var seinaan = op - c; seinaan.y = 0;
                OmaAsetettu = op - seinaan.normalized * 0.15f + Vector3.down * 0.25f;
                kirjaa?.Invoke($"seikkailu: kynttilä asetettu seinän viereen (saumat {(SaumatNakyvat ? "näkyvät" : "eivät näy")})");
                return true;
            }
            var t = ydin.Valitse(c.x, c.y, c.z);
            if (t.Toiminto == KynttilaToiminto.Ei) return false;
            ydin.Tee(t);
            if (t.Toiminto == KynttilaToiminto.SammutaOma || t.Toiminto == KynttilaToiminto.SammutaTilan) SeikkailuAanet.Soita("puhallus", c, 0.6f);
            kirjaa?.Invoke($"seikkailu: kynttilä {t.Toiminto} {t.Indeksi} (palavia {ydin.Palavia}/{ydin.Maara}, oma {(ydin.OmaPalaa ? "palaa" : "ei")})");
            return true;
        }

        /// <summary>Onko toiminto tarjolla (nappi näkyviin).</summary>
        public bool ToimintoTarjolla(SeikkailuPelaaja p)
        {
            if (p == null) return false;
            var c = p.transform.position + Vector3.up * 1.0f;
            if (LuukullaOn(c)) return true;
            if (ydin.OmaKynttila && !ydin.OmaPalaa && OmaAsetettu == null && Vector3.Distance(c + Vector3.up * 0.4f, IkuinenValo) < SytytysM + 0.6f) return true;
            if (OmaAsetettu is Vector3 asp && Vector3.Distance(asp, c) < 1.2f) return true;
            if (OmaAsetettu == null && ydin.OmaPalaa && OnttoPaikka() is Vector3 op && Vector3.Distance(op, c) < 1.3f) return true;
            return ydin.Valitse(c.x, c.y, c.z).Toiminto != KynttilaToiminto.Ei && (Lahella(c) || ydin.OmaPalaa);
        }

        void Update()
        {
            for (int i = 0; i < liekit.Count; i++)
                if (liekit[i].Go != null && liekit[i].Go.activeSelf != ydin.Palaa(i)) liekit[i].Go.SetActive(ydin.Palaa(i));
            if (leivottu != null) leivottu.SetFloat(IdKirkkaus, kirkkausAlku * Mathf.Lerp(Himmein, 1f, (float)ydin.Osuus));
            if (ikuinenValoLight == null && liekit.Count > 0) AsetaPaikat();
            SeikkailuAanet.Silmukka("tuuli-rako", LuukkuAuki, Luukku, 0.6f);
            // Luukku kääntyy saranallaan 0,8 s:ssa; auki kylmä sinertävä yövalo.
            saranaKulma = Mathf.MoveTowards(saranaKulma, LuukkuAuki ? LuukkuAuki0 : 0f, LuukkuAuki0 / 0.8f * Time.deltaTime);
            if (sarana != null) sarana.localRotation = Quaternion.Euler(0f, saranaKulma, 0f);
            if (yovalo != null) yovalo.intensity = 0.45f * saranaKulma / LuukkuAuki0;
            var p = SeikkailuPelaaja.Aktiivinen;
            bool oma = ydin.OmaPalaa && p != null;
            if (oma)
            {
                var kasi = OmaAsetettu ?? p.Hahmo.TransformPoint(new Vector3(0.22f, 1.15f, 0.3f));
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
                // Näkyvä liekki kädessä (DioraamaLiekit.LuoLyhty: sama 3D-liekki kuin hahmojen lyhdyissä), joka kallistuu vedossa.
                if (omaLiekki == null && liekitLahde != null) omaLiekki = liekitLahde.LuoLyhty(p.Hahmo);
                if (omaLiekki != null)
                {
                    if (OmaAsetettu is Vector3 asl) { omaLiekki.transform.SetParent(transform, false); omaLiekki.transform.position = asl; }
                    else { if (omaLiekki.transform.parent != p.Hahmo) omaLiekki.transform.SetParent(p.Hahmo, false); omaLiekki.transform.localPosition = new Vector3(0.22f, 1.15f, 0.3f); }
                    omaLiekki.SetActive(true);
                    var (kallistus, suunta) = Veto(kasi);
                    if (LuukkuAuki)
                    {
                        // Virtaus luukusta kaari-oven portaikkoon (savupiippu); kätkön kohdalla veto voittaa (TULKINTA: ontelo).
                        var virta = Portaikko - Luukku; virta.y = 0;
                        if (kallistus < 0.3f) { suunta = virta.normalized; kallistus = Mathf.Max(kallistus, 0.45f); }
                        else kallistus = Mathf.Min(1f, kallistus * 1.6f);
                        bool sammuu = Vector3.Distance(kasi, Luukku) < LuukkuSammuuM || Vector3.Distance(kasi, Portaikko) < PortaikkoSammuuM;
                        if (sammuu && OmaAsetettu == null) { ydin.AsetaOma(false); kirjaa?.Invoke("seikkailu: liekki repesi vedossa ja sammui"); }
                    }
                    // Veto (ehdotus huone 5: "kilpien alla liekki kallistuu seinää kohti"): kallistus kohti seinää, värinä vedossa.
                    float varina = kallistus > 0 ? 6f * Mathf.Sin(Time.time * 23f) * kallistus : 0f;
                    var akseli = Vector3.Cross(Vector3.up, suunta);
                    omaLiekki.transform.rotation = Quaternion.AngleAxis(38f * kallistus + varina, akseli.sqrMagnitude > 1e-4f ? akseli.normalized : Vector3.right);
                    if (kallistus > 0.05f && !vetoKirjattu) { kirjaa?.Invoke($"seikkailu: veto tuntuu ({kallistus:F2})"); vetoKirjattu = true; }
                }
            }
            else
            {
                Shader.SetGlobalVector(IdKanto, Vector4.zero);
                if (omaValo != null) omaValo.enabled = false;
                if (omaLiekki != null) omaLiekki.SetActive(false);
            }
        }

        bool vetoKirjattu;
        /// <summary>Vedon voimakkuus 0…1 ja suunta (Unity) pisteessä: merkki veto:&lt;id&gt; (kierto_y = suunta seinään, glTF), 1,0 m:n säde.</summary>
        static (float Kallistus, Vector3 Suunta) Veto(Vector3 p)
        {
            var d = SeikkailuKavely.Data; if (d == null) return (0f, Vector3.forward);
            float paras = 0f; Vector3 suunta = Vector3.forward;
            foreach (var m in d.Lajia("veto"))
            {
                var mp = new Vector3((float)m.X, (float)m.Y, (float)-m.Z);
                float k = 1f - Vector3.Distance(mp, p) / VetoM;
                if (k <= paras) continue;
                paras = k;
                double a = m.KiertoY ?? 0;
                suunta = new Vector3((float)Math.Sin(a), 0f, (float)-Math.Cos(a));
            }
            return (Mathf.Clamp01(paras), suunta);
        }
        public const float VetoM = 1.0f;

        public static void Poista() { var a = Aktiivinen; Aktiivinen = null; if (a != null) Destroy(a.gameObject); }

        void OnDestroy()
        {
            if (Aktiivinen == this) Aktiivinen = null;
            Shader.SetGlobalVector(IdKanto, Vector4.zero);
            if (leivottu != null) leivottu.SetFloat(IdKirkkaus, kirkkausAlku);
            foreach (var l in liekit) if (l.Go != null) l.Go.SetActive(true);
            if (omaValo != null) Destroy(omaValo.gameObject);
            if (omaLiekki != null) Destroy(omaLiekki);
            foreach (var o in luodut) if (o != null) Destroy(o);
        }
    }
}
