// HISTORIAMOOTTORI V3b: VARTIJAT UNITYSSA (Siirtoseppä 7.10.2026; aivot Ytimessä Matkakirja.Linssit.Seikkailu.Vartija).
// - NavMesh ajon aikana Linnanrakentajan kävelypinnoista (SeikkailuKavely.KavelyPinnat; NavMeshBuilder, agentti 0,3 / 1,8 m,
//   askel 0,35 m, rinne 40°) — ei bake-assetteja, linna on ämpärin dataa.
// - Partioreitit merkeistä partio:<osa>-N (osa = merkin osa), järjestys tunnuksen mukaan; yksi vartija per osa (vartija-1500,
//   DioraamaHahmot3D.LisaaIrrallinen: idle / kavely, kävelytahti nopeuden mukaan kuten tilojen reittihahmoilla).
// - Havainnot: näkölinja säteellä (kerros 9, pelaajan oma kapseli ei peitä), valoisuus (V7: liekit; nyt vakio), hiipiminen,
//   askeläänet (juoksu 6 m, kävely 2,5 m, hiipiminen ei kuulu) ja heitot (Aani-jono, V4).
// - Kiinni: pelaaja tarkistuspisteeseen (kävelyn aloituspaikka) ja vartijat partioon.
using System;
using System.Collections.Generic;
using Matkakirja.Linssit.Dioraama;
using Matkakirja.Linssit.Seikkailu;
using UnityEngine;
using UnityEngine.AI;

namespace Matkakirja.Natiivi
{
    public sealed class SeikkailuVartijat : MonoBehaviour
    {
        public static SeikkailuVartijat Aktiivinen { get; private set; }
        public const string Henkilo = "vartija-1500";
        public const double ValoisuusOletus = 0.7, JuoksuKuuluuM = 6, KavelyKuuluuM = 2.5, KavelyKestoS = 1.333;   // skin.kavely_kesto_s (Linnanrakentaja)
        static readonly List<Aanilahde> jono = new List<Aanilahde>();
        /// <summary>Heitetty esine tms. (Unity x, z): kuuluu vartijoille seuraavalla ruudulla.</summary>
        public static void Aani(Vector3 paikka, double kuuluvuusM) => jono.Add(new Aanilahde(paikka.x, paikka.z, kuuluvuusM, Askelaani.Osa(SeikkailuKavely.Data, paikka.x, paikka.y, -paikka.z)));

        sealed class V
        {
            public Vartija Aivot; public NavMeshAgent Agentti; public string Osa; public bool NakiViimeksi;
            public double KavelyAika; public bool Kavelee; public Vector3 Kohde = new Vector3(float.NaN, 0, 0);
            public VartijanTila EdellinenTila;
            public AudioSource Askeleet;
            public float RepliikkiAsti; public int RepliikkiLaskuri;
        }
        /// <summary>Askeläänen klippi (rakennus.json aanet askel-kivi); SeikkailuVartijat.Askeleet asettaa.</summary>
        public static AudioClip AskelKlippi;
        /// <summary>Tilojen liekit valoisuuden lähteenä (Sovitin asettaa).</summary>
        public static DioraamaLiekit Liekit;

        /// <summary>Pelaajan valoisuus 0…1 (vartijoiden näkö ja ensimmäisen persoonan kuvan tummuminen, SeikkailuNakyvyys).
        /// V7: tilojen liekeistä (tulisija, soihdut, kynttilät); E3: kynttilöiden huoneessa kynttilöistä ja omasta kynttilästä.</summary>
        /// <summary>Vaara pisteessä (pelattavuusmalli 2.1, automaattinen hiivintä): lähin vartija alle säteen tai joku epäilee/etsii.</summary>
        public static bool Vaara(Vector3 p, float sade = 10f)
        {
            var a = Aktiivinen; if (a == null) return false;
            foreach (var v in a.vartijat)
            {
                if (v.Aivot.Tila != VartijanTila.Partio && v.Aivot.Tila != VartijanTila.Paluu) return true;
                var ag = v.Agentti; if (ag != null && (ag.transform.position - p).sqrMagnitude < sade * sade) return true;
            }
            return false;
        }

        public static double PelaajanValoisuus(SeikkailuPelaaja p)
        {
            if (p == null) return ValoisuusOletus;
            double v = ValoisuusOletus;
            if (Liekit != null) v = Liekit.Valoisuus(p.transform.position + Vector3.up * 1.0f);
            var ky = SeikkailuKynttilat.Aktiivinen;
            if (ky != null && ky.Lahella(p.transform.position)) v = ky.Valoisuus(p.transform.position + Vector3.up, p.transform.position + Vector3.up);
            // Pelattavuusmalli 2.3: palava kynttilä kädessä paljastaa kantajansa (≥ 0,9, suojattuna ≥ 0,45); vartijan lyhty valaisee
            // (≥ 1 − etäisyys / 4 m).
            if (ky != null && ky.OmaKadessa) v = Math.Max(v, ky.OmaSuojattu ? 0.45 : 0.9);
            var a = Aktiivinen;
            if (a != null)
                foreach (var x in a.vartijat)
                    if (x.Agentti != null && x.Aivot.Profiili.Havaitsee && x.Aivot.Profiili.JahtaaMs > 0)
                        v = Math.Max(v, 1 - Vector3.Distance(x.Agentti.transform.position, p.transform.position) / LyhtyM);
            return v;
        }

        readonly List<V> vartijat = new List<V>();
        NavMeshDataInstance navi; NavMeshData data;
        DioraamaHahmot3D hahmot;
        Action<string> kirjaa;
        Vector3 tarkistus; SeikkailuPelaaja tarkistusPelaaja;
        float armoAsti = -1f; const float ArmoS = 4f;
        double sykliMs = 0.955;

        public int Maara => vartijat.Count;

        public static SeikkailuVartijat Luo(Transform isa, Rakennus rakennus, KavelyData d, DioraamaHahmot3D hahmot, Action<string> kirjaa)
        {
            Poista();
            if (d == null) { kirjaa?.Invoke("seikkailu: vartijat: kävelydata puuttuu"); return null; }
            var go = new GameObject("Seikkailu vartijat") { layer = DioraamaNayttamo.Kerros };
            go.transform.SetParent(isa, false);
            var sv = go.AddComponent<SeikkailuVartijat>();
            sv.hahmot = hahmot; sv.kirjaa = kirjaa;
            var skin = rakennus?.Henkilot != null && rakennus.Henkilot.TryGetValue(Henkilo, out var h) ? h.Malli3d?.Skin : null;
            if (skin != null && skin.KavelySykliM > 0) sv.sykliMs = skin.KavelySykliM * (skin.Skaala > 0 ? skin.Skaala : 1) / KavelyKestoS;
            sv.RakennaNavMesh(isa);
            // Partioreitit osittain.
            var reitit = new SortedDictionary<string, List<KavelyMerkki>>(StringComparer.Ordinal);
            foreach (var m in d.Lajia("partio"))
            {
                string osa = m.Osa ?? m.Tunnus;
                if (!reitit.TryGetValue(osa, out var l)) reitit[osa] = l = new List<KavelyMerkki>();
                l.Add(m);
            }
            foreach (var kv in reitit)
            {
                kv.Value.Sort((a, b) => string.CompareOrdinal(a.Tunnus, b.Tunnus));
                var pisteet = new List<(double X, double Z, double OdotaS)>();
                foreach (var m in kv.Value) pisteet.Add((m.X, -m.Z, m.OdotaS > 0 ? m.OdotaS : 2.0));
                var alku = new Vector3((float)kv.Value[0].X, (float)kv.Value[0].Y, (float)-kv.Value[0].Z);
                if (NavMesh.SamplePosition(alku, out var osuma, 3f, NavMesh.AllAreas)) alku = osuma.position;
                else { kirjaa?.Invoke($"seikkailu: vartija {kv.Key}: alku ei NavMeshillä ({alku})"); continue; }
                var vg = new GameObject("Vartija:" + kv.Key) { layer = DioraamaNayttamo.Kerros };
                vg.transform.SetParent(go.transform, false);
                vg.transform.position = alku;
                var ag = vg.AddComponent<NavMeshAgent>();
                ag.radius = 0.3f; ag.height = 1.8f; ag.baseOffset = 0f; ag.angularSpeed = 360f; ag.acceleration = 6f;
                ag.stoppingDistance = 0.25f; ag.autoBraking = true; ag.speed = (float)Vartija.KavelyMs;
                ag.obstacleAvoidanceType = ObstacleAvoidanceType.LowQualityObstacleAvoidance;
                var v = new V { Aivot = new Vartija(pisteet) { Profiili = VartijaProfiili.Hae(kv.Value[0].Profiili) }, Agentti = ag, Osa = kv.Key, Askeleet = SeikkailuKuulija.Lahde("Askeleet:" + kv.Key, 2f, 28f) };
                foreach (var pm in d.Lajia("piilo")) v.Aivot.Piilot.Add((pm.X, -pm.Z));   // vaihe 3: piilot ja varjot etsintään
                v.Askeleet.loop = true; v.Askeleet.volume = 0.9f;
                sv.vartijat.Add(v);
                hahmot?.LisaaIrrallinen(rakennus, Henkilo, vg.transform, () => (v.Kavelee ? "kavely" : "idle", v.KavelyAika));
            }
            Aktiivinen = sv;
            kirjaa?.Invoke($"seikkailu: vartijat {sv.vartijat.Count} ({string.Join(", ", reitit.Keys)}), NavMesh {(sv.data != null ? "valmis" : "puuttuu")}");
            return sv;
        }

        void RakennaNavMesh(Transform isa)
        {
            var lahteet = new List<NavMeshBuildSource>();
            var rajat = new Bounds(); bool eka = true;
            foreach (var m in SeikkailuKavely.KavelyPinnat)
            {
                if (m == null) continue;
                lahteet.Add(new NavMeshBuildSource { shape = NavMeshBuildSourceShape.Mesh, sourceObject = m, transform = isa.localToWorldMatrix, area = 0 });
                var b = m.bounds; b.center = isa.TransformPoint(b.center);
                if (eka) { rajat = b; eka = false; } else rajat.Encapsulate(b);
            }
            if (lahteet.Count == 0) { kirjaa?.Invoke("seikkailu: vartijat: ei kävelypintoja NavMeshille"); return; }
            rajat.Expand(4f);
            var asetukset = NavMesh.GetSettingsByID(0);
            asetukset.agentRadius = 0.3f; asetukset.agentHeight = 1.8f; asetukset.agentClimb = 0.35f; asetukset.agentSlope = 40f;
            float alku = Time.realtimeSinceStartup;
            data = NavMeshBuilder.BuildNavMeshData(asetukset, lahteet, rajat, Vector3.zero, Quaternion.identity);
            if (data != null) navi = NavMesh.AddNavMeshData(data);
            kirjaa?.Invoke($"seikkailu: NavMesh {lahteet.Count} pintaa, {(Time.realtimeSinceStartup - alku) * 1000:F0} ms");
        }

        void Update()
        {
            float dt = Mathf.Min(Time.unscaledDeltaTime, 0.05f);
            var p = SeikkailuPelaaja.Aktiivinen;
            if (p != null && p != tarkistusPelaaja) { tarkistus = p.transform.position; tarkistusPelaaja = p; }   // uusi pelaaja = uusi tarkistuspiste
            var aanet = new List<Aanilahde>(jono); jono.Clear();
            if (p != null)
            {
                // Askeleet pinnan mukaan (pelattavuusmalli 2.2: kivi 0 / 2,5 / 6 m, puu 1 / 3,5 / 8 m, ...), osa seinäsääntöä varten.
                var pp0 = p.transform.position; var kd = SeikkailuKavely.Data;
                double sade = Askelaani.Sade(Askelaani.Pinta(kd, pp0.x, pp0.y, -pp0.z), p.Tila.Tapa);
                if (p.Tila.Vauhti > 0.3 && sade > 0) aanet.Add(new Aanilahde(pp0.x, pp0.z, sade, Askelaani.Osa(kd, pp0.x, pp0.y, -pp0.z)));
            }
            bool piilossa = p != null && Piilossa(p);
            // Nähty piiloon meno (pelattavuusmalli 2.5): jos jonkin mittari ≥ 0,6 ja näkölinja vapaa piiloon mentäessä, piilo ei suojaa
            // ennen kuin pelaaja lähtee siitä.
            if (piilossa && !oliPiilossa)
                foreach (var x in vartijat) if (x.Aivot.Mittari >= Vartija.TutkiHuippu && x.NakiViimeksi) { piiloPaljastui = true; break; }
            if (!piilossa) piiloPaljastui = false;
            if (piiloPaljastui) piilossa = false;
            double sydan = 0;
            if (piilossa != oliPiilossa) { kirjaa?.Invoke($"seikkailu: pelaaja {(piilossa ? "piilossa" : "esillä")}"); oliPiilossa = piilossa; }
            foreach (var v in vartijat)
            {
                var ag = v.Agentti; if (ag == null || !ag.isOnNavMesh) continue;
                var vp = ag.transform.position;
                // Seinäsääntö: oma osa täysi säde, naapuriosa puolet, muu ei kuulu.
                var kuuluvat = aanet;
                if (aanet.Count > 0)
                {
                    string vosa = Askelaani.Osa(SeikkailuKavely.Data, vp.x, vp.y, -vp.z);
                    kuuluvat = new List<Aanilahde>(aanet.Count);
                    foreach (var a in aanet) { double r = Askelaani.Kuuluvuus(SeikkailuKavely.Data, a.KuuluvuusM, a.Osa, vosa); if (r > 0) kuuluvat.Add(new Aanilahde(a.X, a.Z, r, a.Osa)); }
                }
                var s = new VartijanSyote { VartijaX = vp.x, VartijaZ = vp.z, Valoisuus = PelaajanValoisuus(p), Aanet = kuuluvat, PelaajaVauhti = p != null ? p.Tila.Vauhti : (double?)null };
                if (p != null)
                {
                    var pp = p.transform.position;
                    s.PelaajaX = pp.x; s.PelaajaZ = pp.z; s.Hiipii = p.Tila.Tapa == Liiketapa.Hiipiminen;
                    s.NakolinjaVapaa = Nakolinja(vp + Vector3.up * 1.6f, pp + Vector3.up * 1.2f);
                    s.Piilossa = piilossa || Time.unscaledTime < armoAsti;   // armonaika tarkistuspisteen jälkeen
                }
                else { s.PelaajaX = vp.x + 1000; s.PelaajaZ = vp.z; }
                v.Aivot.Paivita(dt, s);
                v.NakiViimeksi = s.NakolinjaVapaa && !s.Piilossa;
                if (v.Aivot.Tila != v.EdellinenTila)
                {
                    kirjaa?.Invoke($"seikkailu: vartija {v.Osa} {v.EdellinenTila} → {v.Aivot.Tila} (mittari {v.Aivot.Mittari:F2})");
                    Repliikki(v, v.EdellinenTila, v.Aivot.Tila, s.NakolinjaVapaa && v.Aivot.Mittari > 0);
                    v.EdellinenTila = v.Aivot.Tila;
                }
                if (v.Aivot.Tila == VartijanTila.Kiinni) { Kiinni(v); break; }
                if (v.Aivot.Huuto)
                {
                    // Hälytys (kohta 3.5): huuto kuuluu 20 m; enintään kaksi muuta tulee tutkimaan, muut valppaiksi (Vartija.Kutsu).
                    v.Aivot.Huuto = false;
                    var r = SeikkailuRepliikit.Aktiivinen;
                    if (r != null && r.Valmis) r.Soita(v.Aivot.Profiili == VartijaProfiili.Kokki ? "kokki-halytys-6" : "vartija-valpas-1", ag.transform);
                    int tulee = 0;
                    foreach (var x in vartijat)
                        if (x != v && tulee < 2 && x.Agentti != null && (x.Agentti.transform.position - vp).sqrMagnitude < HuutoM * HuutoM) { x.Aivot.Kutsu(v.Aivot.EpailyX, v.Aivot.EpailyZ); tulee++; }
                    kirjaa?.Invoke($"seikkailu: vartija {v.Osa} huusi, {tulee} tulee");
                }
                sydan = Math.Max(sydan, v.Aivot.SydanTempo);
                var kohde = new Vector3((float)v.Aivot.KohdeX, vp.y, (float)v.Aivot.KohdeZ);
                if (v.Aivot.Vauhti > 0)
                {
                    ag.isStopped = false; ag.speed = (float)v.Aivot.Vauhti; ag.updateRotation = true;
                    if (float.IsNaN(v.Kohde.x) || (v.Kohde - kohde).sqrMagnitude > 0.09f) { ag.SetDestination(kohde); v.Kohde = kohde; }
                    var nopeus = ag.velocity; nopeus.y = 0;
                    if (nopeus.sqrMagnitude > 0.01f) v.Aivot.Yaw = Mathf.Atan2(nopeus.x, nopeus.z) * Mathf.Rad2Deg;
                }
                else
                {
                    ag.isStopped = true; ag.updateRotation = false;
                    var tavoite = Quaternion.Euler(0, (float)v.Aivot.Yaw, 0);
                    ag.transform.rotation = Quaternion.RotateTowards(ag.transform.rotation, tavoite, 220f * dt);
                }
                float v2 = new Vector2(ag.velocity.x, ag.velocity.z).magnitude;
                v.Kavelee = v2 > 0.15f;
                // Askeleet vartijan jaloista kuulokehyksessä (kuuluvat vasemmalta/oikealta kameran suunnasta), tahti nopeuden mukaan.
                var aa = v.Askeleet;
                if (aa != null)
                {
                    SeikkailuKuulija.Aseta(aa, ag.transform.position + Vector3.up * 0.1f);
                    if (aa.clip == null && AskelKlippi != null) aa.clip = AskelKlippi;
                    if (v.Kavelee && aa.clip != null) { aa.pitch = Mathf.Clamp(0.85f + 0.25f * v2, 0.85f, 1.25f); if (!aa.isPlaying) aa.Play(); }
                    else if (aa.isPlaying) aa.Stop();
                }
                // Kävelytahti nopeuden mukaan (silmukka on mitoitettu sykliMs:iin), ei liukuvia jalkoja.
                v.KavelyAika += v.Kavelee ? dt * (v2 / Math.Max(0.1, sykliMs)) * 1.0 : dt;
            }
            // Sydän (kohta 3.4): vahvin vaara kaikista hahmoista; tempo 70 → 120 sävelkorkeutena, voimakkuus mukana. Kappelin sääntö ohjaa
            // samaa silmukkaa kappelissa, joten tämä koskee vain silloin, kun jokin vartija on vaarassa tai juuri lakkasi.
            if (p != null && (sydan > 0 || sydanPaalla))
            {
                sydanPaalla = sydan > 0;
                SeikkailuAanet.Silmukka("sydan", sydanPaalla, p.transform.position + Vector3.up * 1.2f, sydanPaalla ? 0.55f + 0.35f * (float)((sydan - 70) / 50) : 0f,
                    sydanPaalla ? (float)(sydan / 70) : 1f);
            }
        }

        /// <summary>Pystyleikkeen repliikit tilan vaihtuessa (Pelikoodarin manifest: vartija-epaily/etsinta/paluu/kiinni), 4 s tauko per vartija.</summary>
        void Repliikki(V v, VartijanTila oli, VartijanTila nyt, bool nakee)
        {
            var r = SeikkailuRepliikit.Aktiivinen;
            if (r == null || !r.Valmis || Time.unscaledTime < v.RepliikkiAsti) return;
            string t = null; int n = ++v.RepliikkiLaskuri;
            if (nyt == VartijanTila.Epaily) t = n % 2 == 0 ? "vartija-epaily-2" : "vartija-epaily-1";
            else if (nyt == VartijanTila.Etsii) t = n % 2 == 0 ? "vartija-etsinta-3" : "vartija-etsinta-2";
            else if (nyt == VartijanTila.Halytys && v.Aivot.Profiili != VartijaProfiili.Kokki) t = "vartija-valpas-1";
            else if (nyt == VartijanTila.Etsinta) t = oli == VartijanTila.Partio && !nakee ? "vartija-epaily-3" : n % 2 == 0 ? "vartija-etsinta-2" : "vartija-etsinta-1";
            else if (nyt == VartijanTila.Partio && (oli == VartijanTila.Etsinta || oli == VartijanTila.Epaily || oli == VartijanTila.Paluu || oli == VartijanTila.Etsii || oli == VartijanTila.Halytys))
                t = v.Osa == "kirkkotorni-portaat" && r.On("vartija-paluu-3") ? "vartija-paluu-3" : n % 2 == 0 ? "vartija-paluu-2" : "vartija-paluu-1";
            else if (nyt == VartijanTila.Kiinni) t = "vartija-kiinni-1";
            if (t == null) return;
            double kesto = r.Soita(t, v.Agentti.transform);
            v.RepliikkiAsti = Time.unscaledTime + (float)Math.Max(4.0, kesto + 0.5);
        }

        bool oliPiilossa;
        /// <summary>V4 (ensimmäinen pala): piilo:-merkin luona (≤ PiiloM vaakatasossa) piilossa — kyykky-tyyppisessä vain hiipien
        /// (pöydän alla, tynnyrien takana), seisova-tyyppisessä aina (uunin vieressä varjossa).</summary>
        bool Piilossa(SeikkailuPelaaja p)
        {
            var d = SeikkailuKavely.Data; if (d == null) return false;
            var pp = p.transform.position;
            foreach (var m in d.Lajia("piilo"))
            {
                float dx = pp.x - (float)m.X, dz = pp.z + (float)m.Z;
                if (dx * dx + dz * dz > PiiloM * PiiloM || Mathf.Abs(pp.y - (float)m.Y) > 1.2f) continue;
                if (m.Tyyppi == "seisova" || p.Tila.Tapa == Liiketapa.Hiipiminen) return true;
            }
            return false;
        }
        const float PiiloM = 0.7f, HuutoM = 20f, LyhtyM = 4f;
        bool piiloPaljastui;
        bool sydanPaalla;

        bool Nakolinja(Vector3 silmat, Vector3 rinta)
        {
            if (!Physics.Linecast(silmat, rinta, out var osuma, 1 << DioraamaNayttamo.Kerros, QueryTriggerInteraction.Ignore)) return true;
            return osuma.collider.GetComponentInParent<SeikkailuPelaaja>() != null;
        }

        void Kiinni(V v)
        {
            var p = SeikkailuPelaaja.Aktiivinen;
            kirjaa?.Invoke($"seikkailu: KIINNI ({v.Osa}), pelaaja tarkistuspisteeseen {tarkistus}");
            if (p != null) p.Siirra(tarkistus);
            armoAsti = Time.unscaledTime + ArmoS;   // E1-ajo 7.10.: tarkistuspiste vartijan näkyvissä → kiinni uudelleen heti
            foreach (var x in vartijat) { var vp = x.Agentti.transform.position; x.Aivot.Nollaa(vp.x, vp.z, valpas: true); x.EdellinenTila = VartijanTila.Partio; }   // tyrmästä palatessa valppaus 60 s
        }

        /// <summary>Tila lokiin ("poikki vartijat"): tila, mittari ja paikka per vartija.</summary>
        public string Raportti()
        {
            var sb = new System.Text.StringBuilder($"vartijat {vartijat.Count}");
            foreach (var v in vartijat) sb.Append($"; {v.Osa}: {v.Aivot.Tila} mittari {v.Aivot.Mittari:F2} @ {v.Agentti.transform.position}");
            return sb.ToString();
        }

        public static void Poista()
        {
            var a = Aktiivinen; Aktiivinen = null;
            if (a != null) Destroy(a.gameObject);
        }

        void OnDestroy()
        {
            if (Aktiivinen == this) Aktiivinen = null;
            hahmot?.PoistaIrralliset(Henkilo);
            foreach (var v in vartijat) if (v.Askeleet != null) Destroy(v.Askeleet.gameObject);
            if (navi.valid) NavMesh.RemoveNavMeshData(navi);
            if (data != null) Destroy(data);
        }
    }
}
