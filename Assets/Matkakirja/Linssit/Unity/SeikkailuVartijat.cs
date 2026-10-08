// HISTORIAMOOTTORI V3b: VARTIJAT UNITYSSA (Siirtoseppä 7.10.2026; aivot Ytimessä Matkakirja.Linssit.Seikkailu.Vartija).
// - NavMesh ajon aikana Linnanrakentajan kävelypinnoista (SeikkailuKavely.KavelyPinnat; NavMeshBuilder, agentti 0,3 / 1,8 m,
//   askel 0,35 m, rinne 40°) — ei bake-assetteja, linna on ämpärin dataa.
// - Partioreitit merkeistä partio:<osa>-N (osa = merkin osa), järjestys tunnuksen mukaan; yksi vartija per osa (vartija-1500,
//   DioraamaHahmot3D.LisaaIrrallinen: idle / kavely, kävelytahti nopeuden mukaan kuten tilojen reittihahmoilla).
// - Havainnot: näkölinja säteellä (kerros 9, pelaajan oma kapseli ei peitä), valoisuus (V7: liekit; nyt vakio), hiipiminen,
//   askeläänet (juoksu 6 m, kävely 2,5 m, hiipiminen ei kuulu) ja heitot (Aani-jono, V4).
// - Kiinni: pelaaja tarkistuspisteeseen (kävelyn aloituspaikka) ja vartijat partioon.
using System;
using System.Collections;
using System.Collections.Generic;
using Matkakirja.Linssit.Dioraama;
using Matkakirja.Linssit.Seikkailu;
using UnityEngine;
using UnityEngine.AI;
using UnityEngine.InputSystem;

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
            public Vartija Aivot; public NavMeshAgent Agentti; public string Osa, Nimi, Henkilo, Leike; public bool NakiViimeksi;
            public double KavelyAika; public bool Kavelee; public Vector3 Kohde = new Vector3(float.NaN, 0, 0);
            public VartijanTila EdellinenTila;
            public AudioSource Askeleet;
            public float RepliikkiAsti; public int RepliikkiLaskuri;
            /// <summary>Kannetun valon säde (lyhty 4 m, soihtu 6 m), 0 = ei kanna.</summary>
            public float ValoM;
        }
        /// <summary>Askeläänen klippi (rakennus.json aanet askel-kivi); SeikkailuVartijat.Askeleet asettaa.</summary>
        public static AudioClip AskelKlippi;
        /// <summary>Rakennuksen askeläänitteet tunnuksella (askel-kivi, askel-puu; DioraamaSovitin lataa). Pelaajan omat askeleet.</summary>
        public static readonly Dictionary<string, AudioClip> AskelKlipit = new Dictionary<string, AudioClip>(StringComparer.Ordinal);
        AudioSource omatAskeleet;
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

        /// <summary>Torkkuva vartija alle 1,6 m:n päässä ja vielä ilman eväitä (toimintonapin verbi "Anna").</summary>
        public static bool TarjotinVastaanottaja(Vector3 p)
        {
            var a = Aktiivinen; if (a == null) return false;
            foreach (var v in a.vartijat)
                if (v.Aivot.Profiili == VartijaProfiili.Torkku && v.Aivot.Torkkuu && !v.Aivot.Syo && v.Agentti != null && (v.Agentti.transform.position - p).sqrMagnitude < 1.6f * 1.6f) return true;
            return false;
        }

        /// <summary>Tarjotin torkkuvalle vartijalle: herää eväisiin (vartija-tarjotin-1) ja jää syömään (näkee vain katsejaksoissa).</summary>
        public static bool AnnaTarjotin(Vector3 p)
        {
            var a = Aktiivinen; if (a == null) return false;
            foreach (var v in a.vartijat)
                if (v.Aivot.Profiili == VartijaProfiili.Torkku && v.Aivot.Torkkuu && !v.Aivot.Syo && v.Agentti != null && (v.Agentti.transform.position - p).sqrMagnitude < 1.6f * 1.6f)
                {
                    v.Aivot.Syo = true;
                    var r = SeikkailuRepliikit.Aktiivinen; if (r != null && r.Valmis) r.Soita("vartija-tarjotin-1", v.Agentti.transform);
                    a.kirjaa?.Invoke("seikkailu: torkkuva vartija sai eväät");
                    return true;
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
            // (≥ 1 − etäisyys / 4 m; soihdun kantaja 6 m).
            if (ky != null && ky.OmaKadessa) v = Math.Max(v, ky.OmaSuojattu ? 0.45 : 0.9);
            var a = Aktiivinen;
            if (a != null)
                foreach (var x in a.vartijat)
                    if (x.Agentti != null && x.Aivot.Profiili.Havaitsee && x.Aivot.Profiili.JahtaaMs > 0)
                        v = Math.Max(v, 1 - Vector3.Distance(x.Agentti.transform.position, p.transform.position) / (x.ValoM > 0 ? x.ValoM : LyhtyM));
            return v;
        }

        readonly List<V> vartijat = new List<V>();
        NavMeshDataInstance navi; NavMeshData data;
        DioraamaHahmot3D hahmot;
        Action<string> kirjaa;
        Vector3 tarkistus; SeikkailuPelaaja tarkistusPelaaja;
        string pelaajanOsa; float osaTarkistus, hehkuTarkistus; string kiinniOsa; int kiinniOsassa;
        /// <summary>Viimeisimmän tarkistuspisteen osa ja tapahtuma (V6 tallennus kuuntelee).</summary>
        public static string TarkistusOsa;
        public static event Action<string, Vector3> Tarkistuspiste;
        /// <summary>Kiinnijäänti (osa, jossa pelaaja oli): V6 tallennus laskee huoneittain.</summary>
        public static event Action<string> Kiinnijaatiin;
        /// <summary>Seuraava Luo antaa armonajan heti (jatko tallennuksesta, pelattavuusmalli 4.3).</summary>
        public static bool AlkuArmo;
        /// <summary>Sydän lyö (jonkin hahmon vaara, kohta 3.4).</summary>
        public bool SydanLyo => sydanPaalla;
        public Vector3 Tarkistus => tarkistus;
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
            // Reitti = merkin nimi ilman loppunumeroa (partio:portinvartija-1, -2 …; v44m: useampi reitti samassa osassa).
            var reitit = new SortedDictionary<string, List<KavelyMerkki>>(StringComparer.Ordinal);
            foreach (var m in d.Lajia("istuu")) if (m.Profiili != null) reitit["istuu-" + m.Tunnus] = new List<KavelyMerkki> { m };   // torkkuva vartija (ei istuu:pelaaja-*)
            foreach (var m in d.Lajia("partio"))
            {
                int vi = m.Tunnus.LastIndexOf('-');
                string nimi = vi > 0 && int.TryParse(m.Tunnus.Substring(vi + 1), out _) ? m.Tunnus.Substring(0, vi) : m.Tunnus;
                if (!reitit.TryGetValue(nimi, out var l)) reitit[nimi] = l = new List<KavelyMerkki>();
                l.Add(m);
            }
            foreach (var kv in reitit)
            {
                kv.Value.Sort((a, b) => Numero(a.Tunnus).CompareTo(Numero(b.Tunnus)));
                var eka = kv.Value.Find(x => x.Profiili != null || x.Henkilo != null) ?? kv.Value[0];
                string henkilo = eka.Henkilo ?? Henkilo;
                if (rakennus?.Henkilot == null || !rakennus.Henkilot.ContainsKey(henkilo)) henkilo = Henkilo;
                bool istuu = eka.Laji == "istuu";
                var pisteet = new List<(double X, double Z, double OdotaS)>();
                foreach (var m in kv.Value) pisteet.Add((m.X, -m.Z, istuu ? 1e9 : m.OdotaS > 0 ? m.OdotaS : 2.0));
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
                double yaw0 = eka.KiertoY is double ky0 ? -ky0 * 180 / Math.PI : 0;
                var v = new V { Aivot = new Vartija(pisteet, yaw0) { Profiili = VartijaProfiili.Hae(eka.Profiili), Torkkuu = istuu }, Agentti = ag, Osa = eka.Osa ?? kv.Key, Nimi = kv.Key, Henkilo = henkilo, Askeleet = SeikkailuKuulija.Lahde("Askeleet:" + kv.Key, 2f, 28f) };
                foreach (var pm in d.Lajia("piilo")) v.Aivot.Piilot.Add((pm.X, -pm.Z));   // vaihe 3: piilot ja varjot etsintään
                v.Askeleet.loop = true; v.Askeleet.volume = 0.9f;
                // Kannettu valo (pelattavuusmalli 8.1: portinvartijan lyhty, portaiden vastaantulijan soihtu): oikea pistevalo ilman varjoja,
                // joten valo kasvaa kierreportaan kaarevalla seinällä ennen kuin kantaja tulee näkyviin; liekki käden kohdalle, hehku laatutasolla.
                var kantaja = kv.Value.Find(x => x.Lyhty || x.Soihtu);
                if (kantaja != null)
                {
                    bool soihtu = kantaja.Soihtu;
                    v.ValoM = soihtu ? SoihtuM : LyhtyM;
                    var kasi = soihtu ? new Vector3(0.3f, 1.55f, 0.2f) : new Vector3(0.28f, 0.95f, 0.12f);
                    var liekki = DioraamaHahmot3D.LyhdynLuoja?.Invoke(vg.transform);
                    if (liekki != null) { liekki.transform.localPosition = kasi; if (soihtu) liekki.transform.localScale *= 2.5f; }
                    SeikkailuValot.Hehku(vg.transform, kasi + Vector3.up * 0.08f, new Color(1f, 0.62f, 0.3f), soihtu ? 1.6f : 1.1f, v.ValoM, true, DioraamaNayttamo.Kerros);
                }
                sv.vartijat.Add(v);
                // Torkkuja: leikkeet torkku / syo, jos skinissä (LR pyydetty), muuten idle (Hahmot3D:n varaketju).
                hahmot?.LisaaIrrallinen(rakennus, henkilo, vg.transform, () => (v.Leike ?? "idle", v.KavelyAika));
                DioraamaHahmot3D.PiilotetutHenkilot.Add(henkilo);   // kohtauksen sama henkilö pois (ei kahta kokkia)
                sv.henkilot.Add(henkilo);
            }
            Aktiivinen = sv;
            if (AlkuArmo) { AlkuArmo = false; sv.armoAsti = Time.unscaledTime + ArmoS; }
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
            if (Time.unscaledTime > hehkuTarkistus) { hehkuTarkistus = Time.unscaledTime + 2f; SeikkailuValot.HehkuIsoihinLiekkeihin(Liekit, DioraamaNayttamo.Kerros); }
            if (ote != null) return;   // kiinnijäänti käynnissä (Ote-kulku)
            if (p != null && !riitaKaynnissa && (riitaAsti -= dt) <= 0) { riitaAsti = RiitaValiS; StartCoroutine(Riita(p)); }
            if (p != null && p != tarkistusPelaaja) { tarkistus = p.transform.position; tarkistusPelaaja = p; }   // uusi pelaaja = uusi tarkistuspiste
            // Tarkistuspisteet portaaleista (pelattavuusmalli 4.3): kynnyksen ylitys uuteen kävelyosaan, kun kukaan ei epäile.
            if (p != null && Time.unscaledTime > osaTarkistus)
            {
                osaTarkistus = Time.unscaledTime + 0.25f;
                var pp1 = p.transform.position;
                string osaNyt = Askelaani.Osa(SeikkailuKavely.Data, pp1.x, pp1.y, -pp1.z);
                if (osaNyt != null && osaNyt != pelaajanOsa)
                {
                    if (pelaajanOsa != null && !Vaara(pp1, 0f) && !p.Eleessa && !p.Otteessa)
                    {
                        tarkistus = pp1; TarkistusOsa = osaNyt;
                        kirjaa?.Invoke($"seikkailu: tarkistuspiste {pelaajanOsa} → {osaNyt} ({pp1})");
                        Tarkistuspiste?.Invoke(osaNyt, pp1);
                    }
                    pelaajanOsa = osaNyt;
                    if (kiinniOsa != null && osaNyt != kiinniOsa) { kiinniOsa = null; kiinniOsassa = 0; foreach (var x in vartijat) x.Aivot.Helpotettu = false; }   // helpotus päättyy huoneen vaihtuessa
                }
            }
            var aanet = new List<Aanilahde>(jono); jono.Clear();
            if (p != null)
            {
                // Askeleet pinnan mukaan (pelattavuusmalli 2.2: kivi 0 / 2,5 / 6 m, puu 1 / 3,5 / 8 m, ...), osa seinäsääntöä varten.
                var pp0 = p.transform.position; var kd = SeikkailuKavely.Data;
                string pinta = Askelaani.Pinta(kd, pp0.x, pp0.y, -pp0.z);
                double sade = Askelaani.Sade(pinta, p.Tila.Tapa);
                if (p.Tila.Vauhti > 0.3 && sade > 0) aanet.Add(new Aanilahde(pp0.x, pp0.z, sade, Askelaani.Osa(kd, pp0.x, pp0.y, -pp0.z)));
                OmatAskeleet(p, pinta, pp0);
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
                var s = new VartijanSyote { VartijaX = vp.x, VartijaZ = vp.z, Valoisuus = PelaajanValoisuus(p), Aanet = kuuluvat, PelaajaVauhti = p != null ? p.Tila.Vauhti : (double?)null,
                    Tarjotin = SeikkailuEsineet.Aktiivinen?.Kadessa == SeikkailuEsineet.Tarjotin, Naamio = SeikkailuEsineet.Aktiivinen?.Naamio == true };
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
                if (v.Aivot.Tila == VartijanTila.Kiinni) { if (SeikkailuPelaaja.Ensimmainen && p != null) StartCoroutine(Ote(v, p)); else Kiinni(v); break; }
                if (v.Aivot.Huuto)
                {
                    // Hälytys (kohta 3.5): huuto kuuluu 20 m; enintään kaksi muuta tulee tutkimaan, muut valppaiksi (Vartija.Kutsu).
                    v.Aivot.Huuto = false;
                    var r = SeikkailuRepliikit.Aktiivinen;
                    string huuto = v.Aivot.Profiili == VartijaProfiili.Kokki ? "kokki-halytys-6" : v.Aivot.Profiili == VartijaProfiili.Vartija ? "vartija-valpas-1" : null;
                    if (r != null && r.Valmis && huuto != null) r.Soita(huuto, ag.transform);
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
                // Leike tilasta (torkku / syo / nousu_istumasta v44p); vaihtuessa aika alusta (nousu ei silmukka).
                string leike = v.Aivot.Torkkuu ? (v.Aivot.Syo ? "syo" : "torkku") : v.Aivot.Horjuu && v.Aivot.Profiili == VartijaProfiili.Torkku ? "nousu_istumasta" : v.Kavelee ? "kavely" : "idle";
                if (leike != v.Leike) { v.Leike = leike; v.KavelyAika = 0; }
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
            var pr = v.Aivot.Profiili;
            bool palasi = nyt == VartijanTila.Partio && oli != VartijanTila.Partio && oli != VartijanTila.Kiinni;
            // Profiilien omat äänet (pelattavuusmalli 3.6): kokki ja portinvartija vain omilla repliikeillään, renki ei puhu.
            if (pr == VartijaProfiili.Renki || pr == VartijaProfiili.Apulainen) return;
            if (pr == VartijaProfiili.Kokki || pr == VartijaProfiili.Portinvartija)
            {
                bool kokki = pr == VartijaProfiili.Kokki;
                if (nyt == VartijanTila.Epaily) t = kokki ? "kokki-epaily-5" : "portinvartija-epaily-3";
                else if (nyt == VartijanTila.Etsinta && kokki) t = n % 2 == 0 ? "kokki-harhautus-2" : "kokki-harhautus-1";
                else if (nyt == VartijanTila.Kiinni && !kokki) t = "portinvartija-tarttuu-4";
                else if (palasi) t = kokki ? "kokki-paluu-4" : "portinvartija-paluu-5";
            }
            else if (nyt == VartijanTila.Epaily) t = n % 2 == 0 ? "vartija-epaily-2" : "vartija-epaily-1";
            else if (nyt == VartijanTila.Etsii) t = n % 2 == 0 ? "vartija-etsinta-3" : "vartija-etsinta-2";
            else if (nyt == VartijanTila.Halytys && v.Aivot.Profiili != VartijaProfiili.Kokki) t = "vartija-valpas-1";
            else if (nyt == VartijanTila.Etsinta) t = oli == VartijanTila.Partio && !nakee ? "vartija-epaily-3" : n % 2 == 0 ? "vartija-etsinta-2" : "vartija-etsinta-1";
            else if (nyt == VartijanTila.Partio && (oli == VartijanTila.Etsinta || oli == VartijanTila.Epaily || oli == VartijanTila.Paluu || oli == VartijanTila.Etsii || oli == VartijanTila.Halytys))
                t = (v.Nimi == "piha" || v.Nimi == "kirkkotorni-portaat") && r.On("vartija-paluu-3") ? "vartija-paluu-3" : n % 2 == 0 ? "vartija-paluu-2" : "vartija-paluu-1";   // pihan vartija
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
        /// <summary>Pelaajan omat askeleet (pelattavuusmalli 2.2): pinnan äänite (aanet-fp-manifestista tai rakennuksesta, varana kivi)
        /// silmukkana jalkojen kohdalta, voimakkuus pinnan ja liiketavan mukaan, tahti nopeudesta. Hiivintä kuuluu itselle hiljaa.</summary>
        void OmatAskeleet(SeikkailuPelaaja p, string pinta, Vector3 jalat)
        {
            if (omatAskeleet == null) { omatAskeleet = SeikkailuKuulija.Lahde("Askeleet:pelaaja", 1f, 12f); omatAskeleet.loop = true; }
            var (tunnukset, voima) = Askelaani.OmaAskel(pinta, p.Tila.Tapa);
            AudioClip klippi = null;
            foreach (var t in tunnukset) { klippi = SeikkailuAanet.Klippi(t) ?? (AskelKlipit.TryGetValue(t, out var k) ? k : null); if (klippi != null) break; }
            klippi ??= AskelKlippi;
            SeikkailuKuulija.Aseta(omatAskeleet, jalat + Vector3.up * 0.05f);
            bool liikkuu = p.Tila.Vauhti > 0.3 && !p.Eleessa && !p.Otteessa && klippi != null;
            if (!liikkuu) { if (omatAskeleet.isPlaying) omatAskeleet.Stop(); return; }
            if (omatAskeleet.clip != klippi) { omatAskeleet.clip = klippi; omatAskeleet.Play(); }
            omatAskeleet.volume = voima; omatAskeleet.pitch = Mathf.Clamp(0.8f + 0.2f * (float)p.Tila.Vauhti, 0.8f, 1.45f);
            if (!omatAskeleet.isPlaying) omatAskeleet.Play();
        }

        const float PiiloM = 0.7f, HuutoM = 20f, LyhtyM = 4f, SoihtuM = 6f;
        readonly HashSet<string> henkilot = new HashSet<string>(StringComparer.Ordinal);
        static int Numero(string tunnus) { int vi = tunnus.LastIndexOf('-'); return vi > 0 && int.TryParse(tunnus.Substring(vi + 1), out int n) ? n : 0; }
        bool piiloPaljastui;
        bool sydanPaalla;

        bool Nakolinja(Vector3 silmat, Vector3 rinta)
        {
            if (!Physics.Linecast(silmat, rinta, out var osuma, 1 << DioraamaNayttamo.Kerros, QueryTriggerInteraction.Ignore)) return true;
            return osuma.collider.GetComponentInParent<SeikkailuPelaaja>() != null;
        }

        // Riidan ikkuna (pelattavuusmalli 8.1 huone 2): soutaja-2 veneestä → portinvartija-riita-1 → -2, portinvartija 12 s selin porttiin
        // (näkö 4 m, ±35°) → portinvartija-paluu-5. Ensimmäinen 20 s pelaajan tultua, sitten 40 s:n välein, kun pelaaja on laiturilla tai portilla.
        const float RiitaValiS = 40f; float riitaAsti = 20f; bool riitaKaynnissa;
        System.Collections.IEnumerator Riita(SeikkailuPelaaja p)
        {
            var pv = vartijat.Find(x => x.Aivot.Profiili == VartijaProfiili.Portinvartija && x.Agentti != null);
            var pp = p.transform.position; string osa = Askelaani.Osa(SeikkailuKavely.Data, pp.x, pp.y, -pp.z);
            if (pv == null || pv.Aivot.Tila != VartijanTila.Partio || osa != "vesiportti" && osa != "ulkoalue") yield break;
            var d = SeikkailuKavely.Data; Vector3 vene = pv.Agentti.transform.position + pv.Agentti.transform.forward * 6f;
            if (d != null) foreach (var m in d.Merkit) if (m.Nimi == "vene:laituri") vene = new Vector3((float)m.X, (float)m.Y, (float)-m.Z);
            riitaKaynnissa = true;
            var r = SeikkailuRepliikit.Aktiivinen;
            double k1 = r != null && r.Valmis ? r.Soita("soutaja-2", vene) : 0;
            yield return new WaitForSecondsRealtime((float)Math.Max(1.0, k1));
            pv.Aivot.AloitaRiita(vene.x, vene.z);
            kirjaa?.Invoke("seikkailu: riita alkaa (portinvartija selin porttiin 12 s)");
            double k2 = r != null && r.Valmis && pv.Agentti != null ? r.Soita("portinvartija-riita-1", pv.Agentti.transform) : 0;
            yield return new WaitForSecondsRealtime((float)Math.Max(2.0, k2 + 0.3));
            if (pv.Aivot.Riita > 0 && r != null && r.Valmis && pv.Agentti != null) r.Soita("portinvartija-riita-2", pv.Agentti.transform);
            while (pv.Aivot.Riita > 0) yield return null;
            if (pv.Aivot.Tila == VartijanTila.Partio && r != null && r.Valmis && pv.Agentti != null) r.Soita("portinvartija-paluu-5", pv.Agentti.transform);
            riitaKaynnissa = false;
        }

        V ote; bool tyrmassa;
        /// <summary>Pelaaja tyrmässä: vartijat eivät näe eivätkä kuule häntä (tyrmässä ei voi jäädä uudelleen kiinni).</summary>
        public bool Tyrmassa => tyrmassa;
        /// <summary>Kiinnijäänti ensimmäisessä persoonassa (pelattavuusmalli 4.1): ote olasta (nytkähdys 3°), 1,0 s:n irtipääsyikkuna
        /// (toiminto: E, X tai toimintonappi → Vartija.Irrottaudu, 3 s etumatka), sitten kuva himmenee 1,5 s (vartija-kiinni-2) ja
        /// pelaaja tarkistuspisteeseen (tyrmä tulee tähän), kaikki vartijat valppaina.</summary>
        IEnumerator Ote(V v, SeikkailuPelaaja p)
        {
            ote = v; p.Otteessa = true; p.Tila.KameraPitch = Math.Min(p.Tila.PitchYla, p.Tila.KameraPitch + 3);
            kirjaa?.Invoke($"seikkailu: ote ({v.Osa})");
            SeikkailuEsineet.ToimintoPyydetty = false;
            bool irti = false;
            for (float t = 0; t < Vartija.IrtiIkkunaS; t += Time.unscaledDeltaTime)
            {
                var kb = Keyboard.current; var gp = Gamepad.current;
                bool toiminto = SeikkailuEsineet.ToimintoPyydetty || kb != null && kb.eKey.wasPressedThisFrame || gp != null && gp.buttonWest.wasPressedThisFrame;
                SeikkailuEsineet.ToimintoPyydetty = false;
                if (toiminto && v.Aivot.Irrottaudu()) { irti = true; break; }
                yield return null;
            }
            if (irti && p != null)
            {
                // Hanskakäsi vetää hihan vapaaksi: askel irti vartijasta, hahmo horjahtaa (Ydin), jahti jatkuu 3 s:n päästä.
                var pois = p.transform.position - v.Agentti.transform.position; pois.y = 0;
                p.Siirra(p.transform.position + (pois.sqrMagnitude > 1e-4f ? pois.normalized : -p.Hahmo.forward) * 0.5f);
                p.KasiEle("luukku");
                p.Otteessa = false; ote = null; v.EdellinenTila = v.Aivot.Tila;
                kirjaa?.Invoke($"seikkailu: irtipääsy ({v.Osa})");
                yield break;
            }
            SeikkailuNakyvyys.Himmennys = 1f;
            var r = SeikkailuRepliikit.Aktiivinen;
            if (r != null && r.Valmis && v.Agentti != null) r.Soita("vartija-kiinni-2", v.Agentti.transform);
            yield return new WaitForSecondsRealtime(SeikkailuNakyvyys.HimmennysS);
            if (p != null) p.Otteessa = false;
            // Tyrmä (pelattavuusmalli 4.1), jos sen merkit ovat paketissa: vartijat nollautuvat heti, pelaaja palaa tarkistuspisteeseen
            // vasta paon jälkeen (armoaika ja valppaus silloin).
            if (p != null && SeikkailuTyrma.Aloita(transform.parent, p, () => { Kiinni(v); }, kirjaa))
            {
                foreach (var x in vartijat) { var xp = x.Agentti.transform.position; x.Aivot.Nollaa(xp.x, xp.z, valpas: true); x.EdellinenTila = VartijanTila.Partio; }
                tyrmassa = true;
                while (SeikkailuTyrma.Aktiivinen != null) yield return null;
                tyrmassa = false; ote = null;
                yield break;
            }
            Kiinni(v);
            ote = null;
            yield return new WaitForSecondsRealtime(0.3f);
            SeikkailuNakyvyys.Himmennys = 0f;
        }

        void Kiinni(V v)
        {
            var p = SeikkailuPelaaja.Aktiivinen;
            kirjaa?.Invoke($"seikkailu: KIINNI ({v.Osa}), pelaaja tarkistuspisteeseen {tarkistus}");
            if (p != null)
            {
                string osa = Askelaani.Osa(SeikkailuKavely.Data, p.transform.position.x, p.transform.position.y, -p.transform.position.z);
                Kiinnijaatiin?.Invoke(osa);
                // Anteeksianto (pelattavuusmalli 4.2): 2. kiinnijäänti samassa huoneessa → näkö −15 % ja epäilyraja 0,4; 3. → Pulun taso 2 heti.
                kiinniOsassa = osa == kiinniOsa ? kiinniOsassa + 1 : 1; kiinniOsa = osa;
                if (kiinniOsassa >= 2) foreach (var x in vartijat) x.Aivot.Helpotettu = true;
                if (kiinniOsassa >= 3) SeikkailuVihjeet.Aktiivinen?.Pakota(2, "3. kiinnijäänti");
                kirjaa?.Invoke($"seikkailu: kiinnijäänti {kiinniOsassa}. kerran osassa {osa}{(kiinniOsassa >= 2 ? " (helpotus)" : "")}");
            }
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
            foreach (var h in henkilot) { hahmot?.PoistaIrralliset(h); DioraamaHahmot3D.PiilotetutHenkilot.Remove(h); }
            foreach (var v in vartijat) if (v.Askeleet != null) Destroy(v.Askeleet.gameObject);
            if (omatAskeleet != null) Destroy(omatAskeleet.gameObject);
            if (navi.valid) NavMesh.RemoveNavMeshData(navi);
            if (data != null) Destroy(data);
        }
    }
}
