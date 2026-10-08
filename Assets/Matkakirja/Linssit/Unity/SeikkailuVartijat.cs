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
        public static void Aani(Vector3 paikka, double kuuluvuusM) => jono.Add(new Aanilahde(paikka.x, paikka.z, kuuluvuusM, Askelaani.Osa(SeikkailuKavely.Data, paikka.x, paikka.y, -paikka.z), paikka.y));

        sealed class V
        {
            public Vartija Aivot; public NavMeshAgent Agentti; public string Osa, Nimi, Henkilo, Leike; public bool NakiViimeksi;
            public double KavelyAika; public bool Kavelee; public Vector3 Kohde = new Vector3(float.NaN, 0, 0);
            public VartijanTila EdellinenTila;
            public AudioSource Askeleet;
            public float RepliikkiAsti; public int RepliikkiLaskuri;
            /// <summary>Kannetun valon säde (lyhty 4 m, soihtu 6 m), 0 = ei kanna.</summary>
            public float ValoM;
            public bool Tunnisti;
            public Vector3 Alku;
            /// <summary>Huone 8: talonpoika kääntyy kerran (kaantyy_s) kohti käytävää 5 s pelaajan tultua 8 m:n päähän; 0 ei, 1 odottaa, 2 kääntynyt, 3 tehty.</summary>
            public double KaantyyS, AlkuYaw; public int KaantyyVaihe; public float KaantyyAika;
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
                if (v.Agentti == null || !v.Agentti.gameObject.activeInHierarchy) continue;   // odottava reitti (pako: ranta)
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
                if (OttaaTarjottimen(v, p)) return true;
            return false;
        }

        /// <summary>Torkkuja ottaa tarjottimen torkkuessaan tai heränneenä (ei hälytyksessä eikä jo syödessä; LS2 8.10.: herännyt ei ottanut).</summary>
        static bool OttaaTarjottimen(V v, Vector3 p) => v.Aivot.Profiili == VartijaProfiili.Torkku && !v.Aivot.Syo && v.Agentti != null
            && v.Aivot.Tila != VartijanTila.Halytys && v.Aivot.Tila != VartijanTila.Kiinni && (v.Agentti.transform.position - p).sqrMagnitude < 1.6f * 1.6f;

        /// <summary>Tarjotin torkkuvalle vartijalle: herää eväisiin (vartija-tarjotin-1) ja jää syömään (näkee vain katsejaksoissa).</summary>
        public static bool AnnaTarjotin(Vector3 p)
        {
            var a = Aktiivinen; if (a == null) return false;
            foreach (var v in a.vartijat)
                if (OttaaTarjottimen(v, p))
                {
                    v.Aivot.Torkkuu = true; v.Aivot.Syo = true;   // herännyt istuu takaisin syömään
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
            // vain kantaja (≥ 1 − etäisyys / 4 m, soihtu 6 m).
            if (ky != null && ky.OmaKadessa) v = Math.Max(v, ky.OmaSuojattu ? 0.45 : 0.9);
            var a = Aktiivinen;
            if (a != null)
                foreach (var x in a.vartijat)
                    if (x.Agentti != null && x.ValoM > 0 && x.Agentti.gameObject.activeInHierarchy)   // vain lyhdyn tai soihdun kantaja (LS2 8.10.)
                        v = Math.Max(v, 1 - Vector3.Distance(x.Agentti.transform.position, p.transform.position) / x.ValoM);
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
            foreach (var m in d.Lajia("istuu")) if (m.Profiili != null || m.Tunnus == "vouti") reitit["istuu-" + m.Tunnus] = new List<KavelyMerkki> { m };   // torkkuva vartija ja linnaväki (ei istuu:pelaaja-*), vouti (M-osa huone 6)
            foreach (var m in d.Lajia("seisoo")) if (m.Henkilo != null) reitit["seisoo-" + m.Tunnus] = new List<KavelyMerkki> { m };   // M-osa: harjan vartija ja talonpoika, rannan vartija
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
                bool istuu = eka.Laji == "istuu", seisoo = eka.Laji == "seisoo";
                var pisteet = new List<(double X, double Z, double OdotaS)>();
                foreach (var m in kv.Value) pisteet.Add((m.X, -m.Z, istuu || seisoo ? 1e9 : m.OdotaS > 0 ? m.OdotaS : 2.0));
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
                // kierto_y kääntää glTF:n +Z:aa; Unityssa z peilattu → katseen yaw = 180° − kierto_y (LS2 8.10.: −kierto_y katsoi väärään suuntaan).
                double yaw0 = eka.KiertoY is double ky0 ? 180 - ky0 * 180 / Math.PI : 0;
                var v = new V { Aivot = new Vartija(pisteet, yaw0) { Profiili = (seisoo || istuu) && eka.Profiili == null ? VartijaProfiili.Linnavaki : VartijaProfiili.Hae(eka.Profiili),
                    // Istuvat syövät (linnaväki ja noppa: näkevät katsejaksoissa); vouti valveilla (SeikkailuSali ohjaa katseen).
                    Uppoutunut = seisoo && eka.Tunnus.StartsWith("harja", StringComparison.Ordinal),   // huone 8: katsovat järvelle
                    Torkkuu = istuu && eka.Profiili != null, Syo = istuu && (eka.Tunnus.StartsWith("linnavaki", StringComparison.Ordinal) || eka.Tunnus.StartsWith("noppa", StringComparison.Ordinal)) }, Agentti = ag, Osa = eka.Osa ?? kv.Key, Nimi = kv.Key, Henkilo = henkilo, Askeleet = SeikkailuKuulija.Lahde("Askeleet:" + kv.Key, 2f, 28f) };
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
                v.Alku = alku; v.KaantyyS = eka.KaantyyS; v.AlkuYaw = yaw0;
                sv.vartijat.Add(v);
                if (Odottavat.Contains(kv.Key)) vg.SetActive(false);   // pako: rannan soihtuvartijat vasta kellon jälkeen (SeikkailuPako)
                // Torkkuja: leikkeet torkku / syo, jos skinissä (LR pyydetty), muuten idle (Hahmot3D:n varaketju).
                // Skin-hahmo katsoo Unityssa paikallista −z:aa → 180° kuten pelaajalla ja kappelin hahmoilla (omistaja 8.10.: laiturin hahmot
                // kävelivät takaperin kuin moonwalkissa, koska kääntö puuttui).
                hahmot?.LisaaIrrallinen(rakennus, henkilo, vg.transform, () => (v.Leike ?? "idle", v.KavelyAika), Quaternion.Euler(0f, 180f, 0f));
                DioraamaHahmot3D.PiilotetutHenkilot.Add(henkilo);   // kohtauksen sama henkilö pois (ei kahta kokkia)
                sv.henkilot.Add(henkilo);
            }
            Aktiivinen = sv;
            sv.PortinValo(d, false);   // portti hehkuu heti hiukan (tehtävä näkyy laiturilta)
            SeikkailuPelaaja.OteHavaittu -= sv.KiipeilijaHavaittu; SeikkailuPelaaja.OteHavaittu += sv.KiipeilijaHavaittu;
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
            // Ohjattu jakso (pako) ja ote-kiipeily takakuvassa: tavallinen havainto pois; vaaran tuovat lyhty (Kiipeily) ja Kurkistus.
            if (p != null && (p.Ohjataan || p.OteKiipeily != null)) p = null;
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
                // Kulkulupa (tarjotin) kävellen: askeleet ovat palvelijan askeleita, eivät herätä tutkimaan (LS2 8.10.: tarjottimen kantajan
                // askeleet herättivät torkkujan ennen kuin tarjotinta ehti antaa). Juoksu kuuluu silti.
                bool lupa = SeikkailuEsineet.Aktiivinen?.Kadessa == SeikkailuEsineet.Tarjotin && p.Tila.Tapa != Liiketapa.Juoksu;
                if (p.Tila.Vauhti > 0.3 && sade > 0 && !lupa) aanet.Add(new Aanilahde(pp0.x, pp0.z, sade, Askelaani.Osa(kd, pp0.x, pp0.y, -pp0.z), pp0.y));
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
            if (piilossa != oliPiilossa)
            {
                kirjaa?.Invoke($"seikkailu: pelaaja {(piilossa ? "piilossa" : "esillä")}");
                // Tarkistuspiste myös turvalliseen piiloon (LS2 8.10.: kirkkotorni-portaat on yksi iso osa, joten muuriportailla kiinni jäänyt
                // palasi Tott-kammioon, josta ei päässyt eteenpäin): piiloon meno kenenkään epäilemättä ja yli 6 m:n päähän edellisestä.
                if (piilossa && p != null && !Vaara(p.transform.position, 0f) && (p.transform.position - tarkistus).sqrMagnitude > 6f * 6f)
                {
                    var pp2 = p.transform.position;
                    tarkistus = pp2; TarkistusOsa = Askelaani.Osa(SeikkailuKavely.Data, pp2.x, pp2.y, -pp2.z) ?? TarkistusOsa;
                    kirjaa?.Invoke($"seikkailu: tarkistuspiste piilossa ({pp2})");
                    Tarkistuspiste?.Invoke(TarkistusOsa, pp2);
                }
                oliPiilossa = piilossa;
            }
            foreach (var v in vartijat)
            {
                var ag = v.Agentti; if (ag == null || !ag.isOnNavMesh) continue;
                if (v.KaantyyS > 0 && v.KaantyyVaihe < 3 && p != null) Kaantyy(v, p);
                var vp = ag.transform.position;
                // Seinäsääntö: oma osa täysi säde, naapuriosa puolet, muu ei kuulu.
                var kuuluvat = aanet;
                if (aanet.Count > 0)
                {
                    string vosa = Askelaani.Osa(SeikkailuKavely.Data, vp.x, vp.y, -vp.z);
                    kuuluvat = new List<Aanilahde>(aanet.Count);
                    foreach (var a in aanet) { double r = Askelaani.Kuuluvuus(SeikkailuKavely.Data, a.KuuluvuusKorkeudella(vp.y), a.Osa, vosa); if (r > 0) kuuluvat.Add(new Aanilahde(a.X, a.Z, r, a.Osa, a.Y)); }
                }
                var s = new VartijanSyote { VartijaX = vp.x, VartijaZ = vp.z, Valoisuus = PelaajanValoisuus(p), Aanet = kuuluvat, PelaajaVauhti = p != null ? p.Tila.Vauhti : (double?)null,
                    Tarjotin = SeikkailuEsineet.Aktiivinen?.Kadessa == SeikkailuEsineet.Tarjotin, Naamio = SeikkailuEsineet.Aktiivinen?.Naamio == true && v.Osa != NaamioEiKelpaaOsa };
                if (p != null)
                {
                    var pp = p.transform.position;
                    s.PelaajaX = pp.x; s.PelaajaZ = pp.z; s.Hiipii = p.Tila.Tapa == Liiketapa.Hiipiminen;
                    s.NakolinjaVapaa = Nakolinja(vp + Vector3.up * 1.6f, pp + Vector3.up * 1.2f);
                    s.Piilossa = piilossa || Time.unscaledTime < armoAsti;   // armonaika tarkistuspisteen jälkeen
                }
                else { s.PelaajaX = vp.x + 1000; s.PelaajaZ = vp.z; }
                v.Aivot.Paivita(dt, s);
                // Apulainen tunnistaa naamioituneen (M-osa huone 6): "Kuka sinä olet?" (apulainen-kuka-1…3, omistajan luvalla).
                if (v.Aivot.Tunnisti && !v.Tunnisti) SeikkailuRepliikit.SoitaTaiVara("apulainen-kuka-" + UnityEngine.Random.Range(1, 4), "apulainen-kuka-1", ag.transform.position + Vector3.up * 1.6f);
                v.Tunnisti = v.Aivot.Tunnisti;
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
                        if (x != v && tulee < 2 && x.Agentti != null && x.Agentti.isOnNavMesh && (x.Agentti.transform.position - vp).sqrMagnitude < HuutoM * HuutoM) { x.Aivot.Kutsu(v.Aivot.EpailyX, v.Aivot.EpailyZ); tulee++; }
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
        /// <summary>Riita alkoi (portinvartija selin porttiin): Pulun ensivihje laiturilla (SeikkailuVihjeet, LS2 8.10.).</summary>
        public static event Action RiitaAlkoi;
        System.Collections.IEnumerator Riita(SeikkailuPelaaja p)
        {
            var pv = vartijat.Find(x => x.Aivot.Profiili == VartijaProfiili.Portinvartija && x.Agentti != null);
            var pp = p.transform.position; string osa = Askelaani.Osa(SeikkailuKavely.Data, pp.x, pp.y, -pp.z);
            if (pv == null || pv.Aivot.Tila != VartijanTila.Partio || osa != "vesiportti" && osa != "ulkoalue") yield break;
            var d = SeikkailuKavely.Data; Vector3 vene = pv.Agentti.transform.position + pv.Agentti.transform.forward * 6f;
            if (d != null) foreach (var m in d.Merkit) if (m.Nimi == "vene:laituri") vene = new Vector3((float)m.X, (float)m.Y, (float)-m.Z);
            riitaKaynnissa = true;
            PortinValo(d, true);
            var r = SeikkailuRepliikit.Aktiivinen;
            double k1 = r != null && r.Valmis ? r.Soita("soutaja-2", vene) : 0;
            yield return new WaitForSecondsRealtime((float)Math.Max(1.0, k1));
            pv.Aivot.AloitaRiita(vene.x, vene.z);
            kirjaa?.Invoke("seikkailu: riita alkaa (portinvartija selin porttiin 12 s)");
            RiitaAlkoi?.Invoke();
            double k2 = r != null && r.Valmis && pv.Agentti != null ? r.Soita("portinvartija-riita-1", pv.Agentti.transform) : 0;
            yield return new WaitForSecondsRealtime((float)Math.Max(2.0, k2 + 0.3));
            if (pv.Aivot.Riita > 0 && r != null && r.Valmis && pv.Agentti != null) r.Soita("portinvartija-riita-2", pv.Agentti.transform);
            while (pv.Aivot.Riita > 0) yield return null;
            if (pv.Aivot.Tila == VartijanTila.Partio && r != null && r.Valmis && pv.Agentti != null) r.Soita("portinvartija-paluu-5", pv.Agentti.transform);
            riitaKaynnissa = false;
            PortinValo(d, false);
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
            yield return Vie(v, p);
        }

        /// <summary>Kiinniotto ilman irtipääsyä (himmennys, repliikki, tyrmä tai tarkistuspiste); Ote ja ote-kiipeily (lyhdyn valo).</summary>
        IEnumerator Vie(V v, SeikkailuPelaaja p)
        {
            ote = v;
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

        // Omistaja 8.10. (6): "epäselväksi, mitä laiturilla pitää tehdä" → portti (ovi:vesiportti-loppu) hehkuu lämpimänä aina hiukan ja
        // riidan aikana kirkkaasti: tehtävä näkyy ilman tekstiä (Pulun ensivihje LS2). Valo ei vaikuta havaintoon (valoisuus liekeistä).
        Light portinValo; Coroutine portinHaivytys;
        void PortinValo(KavelyData d, bool riita)
        {
            if (portinValo == null && d != null)
                foreach (var m in d.Merkit)
                    if (m.Nimi == "ovi:vesiportti-loppu")
                    {
                        var g = new GameObject("Portin valo") { layer = DioraamaNayttamo.Kerros }; g.transform.SetParent(transform, false);
                        g.transform.position = new Vector3((float)m.X, (float)m.Y + 1.8f, (float)-m.Z);
                        portinValo = g.AddComponent<Light>(); portinValo.type = LightType.Point; portinValo.range = 6f; portinValo.color = new Color(1f, 0.66f, 0.34f);
                        portinValo.shadows = LightShadows.None; portinValo.intensity = PortinValoLepo;
                        SeikkailuValot.Liekki(g.transform, DioraamaNayttamo.Kerros);
                        break;
                    }
            if (portinValo == null) return;
            if (portinHaivytys != null) StopCoroutine(portinHaivytys);
            portinHaivytys = StartCoroutine(Haivyta(portinValo, riita ? PortinValoRiita : PortinValoLepo, riita ? 1f : 2f));
        }
        const float PortinValoLepo = 0.5f, PortinValoRiita = 1.8f;
        static IEnumerator Haivyta(Light l, float tavoite, float s)
        {
            float alku = l.intensity;
            for (float t = 0; t < s && l != null; t += Time.deltaTime) { l.intensity = Mathf.Lerp(alku, tavoite, t / s); yield return null; }
            if (l != null) l.intensity = tavoite;
        }

        /// <summary>Reitit, jotka luodaan piiloon ja tuodaan esiin vasta tapahtumasta (pelattavuusmalli 8.2 huone 10: kaksi vartijaa
        /// soihtuineen rannassa, jos pako viipyy kellon jälkeen).</summary>
        /// <summary>Palvelijan naamio ei kelpaa muureilla (huoneet 7–10: muurikäytävä, harja, ranta): siellä palvelijalla ei ole asiaa yöllä,
        /// ja pelattavuusmalli 8.2 tekee huoneista 7–8 hiivittäviä (LS2:n huonesimulaatio 8.10.: naamiossa käveli lyhtyvartijan ohi).</summary>
        public const string NaamioEiKelpaaOsa = "muurikaytava";

        public static readonly HashSet<string> Odottavat = new HashSet<string>(StringComparer.Ordinal) { "ranta", "seisoo-ranta-vartija" };

        /// <summary>Odottava reitti esiin (valppaana).</summary>
        public static void Aktivoi(string reitti)
        {
            var a = Aktiivinen; if (a == null) return;
            foreach (var v in a.vartijat)
                if (v.Nimi == reitti && v.Agentti != null && !v.Agentti.gameObject.activeSelf)
                {
                    v.Agentti.gameObject.SetActive(true);
                    var vp = v.Agentti.transform.position; v.Aivot.Nollaa(vp.x, vp.z, valpas: true); v.EdellinenTila = VartijanTila.Partio;
                    a.kirjaa?.Invoke($"seikkailu: reitti {reitti} esiin");
                }
        }

        /// <summary>Paikallaan olevan hahmon katse (yaw, Unity) — huone 6: vouti kääntyy hoitajaan kiistan aikana.</summary>
        public static void Katso(string reitti, double yaw) { var a = Aktiivinen; if (a == null) return; foreach (var v in a.vartijat) if (v.Nimi == reitti) v.Aivot.Yaw = yaw; }

        /// <summary>Hahmon paikka ja katse (yaw) tai null, jos ei ole.</summary>
        public static (Vector3 Paikka, double Yaw)? Hahmo(string reitti)
        {
            var a = Aktiivinen; if (a == null) return null;
            foreach (var v in a.vartijat) if (v.Nimi == reitti && v.Agentti != null) return (v.Agentti.transform.position, v.Aivot.Yaw);
            return null;
        }

        /// <summary>Ote ranteesta (huone 6: avaimet voudin katsoessa) → irtipääsyn ikkuna tai tyrmä kuten tavallinen kiinniotto.</summary>
        public static void OteRanteesta(string reitti)
        {
            var a = Aktiivinen; var p = SeikkailuPelaaja.Aktiivinen; if (a == null || p == null || a.ote != null) return;
            foreach (var v in a.vartijat) if (v.Nimi == reitti) { a.kirjaa?.Invoke($"seikkailu: ote ranteesta ({reitti})"); v.Aivot.OtaKiinni(); a.StartCoroutine(a.Ote(v, p)); return; }
        }

        /// <summary>Reitti takaisin piiloon (pako: uusi yritys, LS2 8.10.): hahmo alkupisteeseensä, rauhaan ja näkymättömiin.</summary>
        public static void Odottamaan(string reitti)
        {
            var a = Aktiivinen; if (a == null) return;
            foreach (var v in a.vartijat)
                if (v.Nimi == reitti && v.Agentti != null && v.Agentti.gameObject.activeSelf)
                {
                    var alku = v.Alku; if (v.Agentti.isOnNavMesh) v.Agentti.Warp(alku);
                    v.Aivot.Nollaa(alku.x, alku.z); v.EdellinenTila = VartijanTila.Partio;
                    v.Agentti.gameObject.SetActive(false);
                    a.kirjaa?.Invoke($"seikkailu: reitti {reitti} piiloon");
                }
        }

        void Kaantyy(V v, SeikkailuPelaaja p)
        {
            float nyt = Time.time;
            if (v.KaantyyVaihe == 0 && (p.transform.position - v.Agentti.transform.position).sqrMagnitude < 8f * 8f) { v.KaantyyVaihe = 1; v.KaantyyAika = nyt + 5f; }
            else if (v.KaantyyVaihe == 1 && nyt >= v.KaantyyAika) { v.KaantyyVaihe = 2; v.KaantyyAika = nyt + (float)v.KaantyyS; v.Aivot.Uppoutunut = false; v.Aivot.Yaw = v.AlkuYaw + 180; kirjaa?.Invoke($"seikkailu: {v.Nimi} kääntyy käytävää kohti ({v.KaantyyS:F0} s)"); }
            else if (v.KaantyyVaihe == 2 && nyt >= v.KaantyyAika) { v.KaantyyVaihe = 3; v.Aivot.Yaw = v.AlkuYaw; v.Aivot.Uppoutunut = true; }
        }

        /// <summary>Hälytyskello (huone 10 vaihe 1): kaikki vartijat valppaiksi (60 s).</summary>
        public static void Valpastu()
        {
            var a = Aktiivinen; if (a == null) return;
            foreach (var x in a.vartijat) if (x.Agentti != null) { var xp = x.Agentti.transform.position; x.Aivot.Nollaa(xp.x, xp.z, valpas: true); x.EdellinenTila = VartijanTila.Partio; }
        }

        /// <summary>Kiinniotto ilman jahtia (pako myöhästyi): lähin näkyvä vartija vie tyrmään.</summary>
        public static void Halyta() => Aktiivinen?.KiipeilijaHavaittu();

        /// <summary>Huone 9: vartija kurkistaa sakaran yli lyhty koholla (toinen tiili putosi 10 s:n sisällä): valo paikkaan s sekuntia;
        /// pelaaja jähmettyy, liike (vauhti > 0,3) → kiinni kuten kiipeilijä lyhdyn valossa.</summary>
        public static void Kurkistus(Vector3 paikka, float s) { var a = Aktiivinen; if (a != null) a.StartCoroutine(a.Kurkista(paikka, s)); }

        IEnumerator Kurkista(Vector3 paikka, float s)
        {
            var g = new GameObject("Kurkistuksen lyhty") { layer = DioraamaNayttamo.Kerros }; g.transform.SetParent(transform, false); g.transform.position = paikka;
            var l = g.AddComponent<Light>(); l.type = LightType.Point; l.range = 0.1f; l.color = new Color(1f, 0.62f, 0.3f); l.intensity = 1.4f; l.shadows = LightShadows.None;
            kirjaa?.Invoke("seikkailu: vartija kurkistaa (jähmety)");
            SeikkailuRepliikit.SoitaTaiVara("vartija-kurkistus-1", "vartija-epaily-1", paikka);
            for (float t = 0; t < s; t += Time.deltaTime)
            {
                l.range = Mathf.Min(LyhtyM, t / 2f * LyhtyM);   // valopiiri kasvaa 2 s (varoitus), sitten liike näkyy
                var p = SeikkailuPelaaja.Aktiivinen;
                if (t > 2f && p != null && p.Tila.Vauhti > 0.3) { Destroy(g); KiipeilijaHavaittu(); yield break; }
                yield return null;
            }
            Destroy(g);
            kirjaa?.Invoke("seikkailu: vartija palasi");
        }

        /// <summary>Huone 8: liike lyhdyn valossa ulkoseinällä (valopiiri kasvoi 2 s = varoitus) → hälytys, vartijat vetävät köydestä
        /// (ei näytetä, FIKTIO) → tyrmä. Lähin vartija tekee kiinnioton.</summary>
        void KiipeilijaHavaittu()
        {
            var p = SeikkailuPelaaja.Aktiivinen; if (p == null || ote != null || vartijat.Count == 0) return;
            V lahin = null; float pd = float.MaxValue;
            foreach (var x in vartijat) { if (x.Agentti == null || !x.Agentti.gameObject.activeInHierarchy) continue; float d = (x.Agentti.transform.position - p.transform.position).sqrMagnitude; if (d < pd) { pd = d; lahin = x; } }
            if (lahin == null) return;
            SeikkailuRepliikit.SoitaTaiVara("vartija-kiipeilija-1", "vartija-valpas-1", lahin.Agentti.transform.position + Vector3.up * 1.6f);   // "Köydessä joku!"
            kirjaa?.Invoke($"seikkailu: kiipeilijä nähtiin lyhdyn valossa ({lahin.Osa})");
            p.LopetaOteKiipeily();
            StartCoroutine(Vie(lahin, p));
        }

        void OnDestroy()
        {
            SeikkailuPelaaja.OteHavaittu -= KiipeilijaHavaittu;
            if (Aktiivinen == this) Aktiivinen = null;
            foreach (var h in henkilot) { hahmot?.PoistaIrralliset(h); DioraamaHahmot3D.PiilotetutHenkilot.Remove(h); }
            foreach (var v in vartijat) if (v.Askeleet != null) Destroy(v.Askeleet.gameObject);
            if (omatAskeleet != null) Destroy(omatAskeleet.gameObject);
            if (navi.valid) NavMesh.RemoveNavMeshData(navi);
            if (data != null) Destroy(data);
        }
    }
}
