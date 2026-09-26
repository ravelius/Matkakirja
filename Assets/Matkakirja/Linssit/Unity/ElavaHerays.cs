// ELÄVÄ KARTTA, kohta 3: MAAKUNTA HERÄÄ (Linssiseppä 26.9.2026; Raamattu ELÄVÄ KARTTA kohta 3, omistajan hyväksymä video).
//
// Pysyvä tila: MaaKartta.Heraannyt (Natiivisepän rajapinta) kysyy tältä maakunnan tilan Pelikoodarin musteesta
// (PeliOhjain.MusteMaakunnat): löytöjä > 0 = herännyt (täysi sävy), 0 = uinuva paperi, ei nostoja = ennallaan.
// Herätys: PeliOhjain.MaakuntaHeraa (ensimmäinen löytö) piilottaa maakunnan pysyvän täytön (MaaKartta.Herata) ja jonottaa
// animaation, joka alkaa, kun kartta on taas vapaana (nostokortti kiinni: ei kuvasumennusta, peli kartalla, ei linssiä).
// Animaatio (Ydin/Elava/Herays, ≤ 2,4 s): rengas noston kohdalla, väri valuu maakuntaan (Maakuntapinta-varjostimen tulva
// uinuvasta täyteen), nimi kirjoittuu käsialalla, löydösmerkit leimautuvat, ja lopuksi pysyvä täyttö palaa (luovutus).
// Natiivi-UI:n kartussi (pikkukuva ja merkit) on oma osansa. Testikomento: "elava herata <ISO:tunnus>".
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CesiumForUnity;
using Matkakirja.Linssit.Aikajana;
using Matkakirja.Linssit.Elava;
using Matkakirja.Linssit.Vesistot;
using TMPro;
using Unity.Mathematics;
using UnityEngine;
using UnityEngine.Rendering;

namespace Matkakirja.Natiivi
{
    public class ElavaHerays : MonoBehaviour
    {
        const double Nosto = 2200, NimenNosto = 2600;

        static readonly Queue<(string Maakunta, string NostoId)> jono = new Queue<(string, string)>();
        static (string Id, string Maakunta) viimeLoyto;
        static readonly Dictionary<string, (int Loydetyt, int Kaikki)> laskurit = new Dictionary<string, (int, int)>(StringComparer.Ordinal);
        static readonly HashSet<string> lasketutMaat = new HashSet<string>(StringComparer.Ordinal);
        static ElavaHerays nykyinen;
        static LinssiOhjain ohjain;

        public static void Kytke(LinssiOhjain o)
        {
            ohjain = o;
            o.StartCoroutine(KytkeKun());
            o.StartCoroutine(Jono());
        }

        static IEnumerator KytkeKun()
        {
            while (PeliOhjain.Instanssi == null) yield return null;
            var po = PeliOhjain.Instanssi;
            MaaKartta.Heraannyt = Tila;
            // Kohta 2: nostojen kokoluokka, löydetty ja näkyvyys NostoKerrokselle (Natiivisepän rajapinta, merkit Natiivi-UI:lla).
            NostoKerros.Muste = valoId =>
            {
                if (!po.MusteLuettu || string.IsNullOrEmpty(valoId)) return null;
                var m = po.NostonMuste(valoId);
                return ((int)m.Luokka, m.Loydetty, m.Nakyy);
            };
            po.MusteValmis += () => { laskurit.Clear(); lasketutMaat.Clear(); MaaKartta.PaivitaHeraaminen(); NostoKerros.PaivitaMuste(); };
            po.NostoLoytyi += t =>
            {
                viimeLoyto = (t.Id, t.Maakunta);
                NostoKerros.PaivitaMuste();
                if (t.Maakunta != null) lasketutMaat.Remove(Maakuntajako.MaaTunnuksesta(t.Maakunta));
            };
            po.MaakuntaHeraa += maakunta => Heraa(maakunta, viimeLoyto.Maakunta == maakunta ? viimeLoyto.Id : null);
            if (po.MusteLuettu) { MaaKartta.PaivitaHeraaminen(); NostoKerros.PaivitaMuste(); }
        }

        /// <summary>MaaKartta.Heraannyt: true herännyt, false uinuva, null ennallaan (ei mustetta tai maakunnassa ei nostoja).</summary>
        static bool? Tila(string avain)
        {
            var po = PeliOhjain.Instanssi;
            if (po == null || !po.MusteLuettu || string.IsNullOrEmpty(avain)) return null;
            string iso = Maakuntajako.MaaTunnuksesta(avain);
            if (iso != null && lasketutMaat.Add(iso))
                foreach (var (m, l, k) in po.MusteMaakunnat(iso)) laskurit[m] = (l, k);
            return laskurit.TryGetValue(avain, out var x) && x.Kaikki > 0 ? x.Loydetyt > 0 : (bool?)null;
        }

        static void Heraa(string maakunta, string nostoId)
        {
            if (string.IsNullOrEmpty(maakunta)) return;
            // Pysyvä täyttö piiloon heti, jottei herännyt sävy näy ennen animaatiota; tila päivitetään samalla.
            MaaKartta.Herata(maakunta, true);
            lasketutMaat.Remove(Maakuntajako.MaaTunnuksesta(maakunta) ?? "");
            MaaKartta.PaivitaHeraaminen();
            if (ohjain != null && ohjain.VahennettyLiike) { MaaKartta.Herata(maakunta, false); return; }
            jono.Enqueue((maakunta, nostoId));
            ohjain?.Kirjaa($"elävä: herätys jonossa {maakunta} (nosto {nostoId ?? "-"})");
        }

        /// <summary>Herätys käynnissä (elävät hetket väistävät).</summary>
        internal static bool Kaynnissa => nykyinen != null;

        internal static bool KarttaVapaa() => KarttaHiljaa() && ElavaKartta.Instanssi == null;

        /// <summary>
        /// Kartta on pelaajan edessä hiljaa (omistaja 26.9. klo 11.5x: elävä kartta ei luennan, pulun puheen eikä kortin aikana):
        /// silmukka kartalla, saapumisluenta ei kesken (Pelikoodarin 162, myös jonossa), ei puhetta (isoisä tai pulu), ei matkakirjakorttia (Natiivi-UI:n KorttiAukiKysely), ei kuvien
        /// sumennusta, porttia eikä linssiä.
        /// </summary>
        internal static bool KarttaHiljaa() => HiljaisuudenEste() == null;

        /// <summary>Ensimmäinen syy, miksi kartta ei ole hiljaa (lokiin odotuksen ajalta), tai null.</summary>
        internal static string HiljaisuudenEste()
        {
            var po = PeliOhjain.Instanssi;
            if (po == null) return "ei peliä";
            if (po.Tila != SilmukanTila.Kartta) return "tila " + po.Tila;
            if (po.SoivaLuento != null) return "luento soi";
            if (po.SaapumisluentaKesken) return "saapumisluenta kesken";
            if (Puhe.Instanssi != null && Puhe.Instanssi.Soi) return "puhe soi";
            if (KorttiAukiKysely?.Invoke() ?? false) return "kortti auki";
            if (PalloKierto.KuvaSumea) return "kuvasumennus";
            if (PalloKierto.PorttiSumea) return "portti";
            if (LinssiOhjain.Rekisteri?.Auki != null) return "linssi auki";
            return null;
        }

        /// <summary>
        /// Natiivi-UI asettaa: luennan kuvapakka lähtee heti (Luentakuvasarja.Hiljeni(0)). Saapuminen kutsuu, kun puhe ja kortit
        /// ovat ohi ja vain pakan kuvasumennus on jäljellä (omistaja 26.9.: animaatio heti kortin/luennan jälkeen, ei 6 s:n pakkaa).
        /// </summary>
        public static Action KuvapakkaLahtee;

        /// <summary>Natiivi-UI asettaa: matkakirjakortti (tai muu saapumisen kortti) on auki.</summary>
        public static Func<bool> KorttiAukiKysely;

        static IEnumerator Jono()
        {
            while (true)
            {
                if (jono.Count > 0 && nykyinen == null && KarttaVapaa())
                {
                    yield return new WaitForSecondsRealtime(0.35f);
                    if (!KarttaVapaa()) continue;
                    var (m, id) = jono.Dequeue();
                    yield return Aloita(m, id);
                }
                yield return null;
            }
        }

        /// <summary>Testikomento "elava herata <ISO:tunnus>": herätys kuten ensimmäisestä löydöstä (ei muuta pelitilaa).</summary>
        public static void Testi(string maakunta)
        {
            MaaKartta.Herata(maakunta, true);
            jono.Enqueue((maakunta, null));
            ohjain?.Kirjaa($"elävä: testiherätys jonossa {maakunta}");
        }

        static IEnumerator Aloita(string avain, string nostoId)
        {
            string iso = Maakuntajako.MaaTunnuksesta(avain);
            yield return ElavaKartta.VarmistaMaakunnat();
            yield return ElavaKartta.VarmistaKarttavalot();
            var maakunta = ElavaKartta.MaakunnatMaalle(iso).FirstOrDefault(x => x.Id == avain);
            if (maakunta == null) { MaaKartta.Herata(avain, false); ohjain?.Kirjaa("elävä: herätys: ei maakuntaa " + avain); yield break; }
            var nosto = nostoId == null ? (ElavaNosto?)null : ElavaKartta.NostotMaalle(iso).Where(n => n.Id == nostoId).Select(n => (ElavaNosto?)n).FirstOrDefault();
            var keskus = nosto?.Paikka ?? maakunta.Keskus;
            var (loydetyt, kaikki) = laskurit.TryGetValue(avain, out var x) ? x : (1, 1);
            var h = new Herays(maakunta, keskus, loydetyt, kaikki);

            List<Jarvikolmiot.Verkko> verkot = null;
            var tyo = Task.Run(() => verkot = maakunta.Renkaat.Select(r => Jarvikolmiot.Laske(r, 1.0)).ToList());
            while (!tyo.IsCompleted) yield return null;
            if (tyo.IsFaulted) { MaaKartta.Herata(avain, false); yield break; }

            var kierto = FindAnyObjectByType<PalloKierto>();
            var go = new GameObject("ElavaHerays " + avain);
            go.transform.SetParent(kierto.georeferenssi.transform, false);
            var e = go.AddComponent<ElavaHerays>();
            e.Alusta(h, avain, verkot, kierto);
            nykyinen = e;
            ohjain?.Kirjaa($"elävä: herää {avain} ({maakunta.Nimi}), {loydetyt}/{kaikki}, tulva {h.TulvaMaxKm:0} km");
            while (e != null) yield return null;
            nykyinen = null;
        }

        // ── Instanssi ────────────────────────────────────────────────────

        Herays h;
        string avain;
        CesiumGeoreference georeferenssi;
        Material taytto, laikat;
        Mesh laikkaMesh;
        readonly List<Vector4> laikkaTila = new List<Vector4>();
        readonly List<UnityEngine.Object> roskat = new List<UnityEngine.Object>();
        TextMeshPro nimi;
        float nimenMinX, nimenMaxX;
        double t;
        bool luovutettu;

        readonly Func<bool> animoi = () => true;
        void OnEnable() => PallonLepo.Animoi(animoi, "elävä herätys");
        void OnDisable() => PallonLepo.Poista(animoi);

        Vector3 Paikka(LatLon p, double korkeus)
        {
            var ecef = CesiumWgs84Ellipsoid.LongitudeLatitudeHeightToEarthCenteredEarthFixed(new double3(p.Lon, p.Lat, korkeus));
            return (float3)georeferenssi.TransformEarthCenteredEarthFixedPositionToUnity(ecef);
        }

        static Vector3 Suunta(LatLon p)
        {
            double la = p.Lat * Math.PI / 180, lo = p.Lon * Math.PI / 180;
            return new Vector3((float)(Math.Cos(la) * Math.Cos(lo)), (float)(Math.Cos(la) * Math.Sin(lo)), (float)Math.Sin(la));
        }

        (Vector3 Ita, Vector3 Pohjoinen, Vector3 Ylos) Kanta(LatLon p)
        {
            double la = p.Lat * Math.PI / 180, lo = p.Lon * Math.PI / 180;
            Vector3 U(double3 d) => ((Vector3)(float3)georeferenssi.TransformEarthCenteredEarthFixedDirectionToUnity(d)).normalized;
            return (U(new double3(-Math.Sin(lo), Math.Cos(lo), 0)),
                    U(new double3(-Math.Sin(la) * Math.Cos(lo), -Math.Sin(la) * Math.Sin(lo), Math.Cos(la))),
                    U(new double3(Math.Cos(la) * Math.Cos(lo), Math.Cos(la) * Math.Sin(lo), Math.Sin(la))));
        }

        Material Materiaali(string varjostin)
        {
            var s = Resources.Load<Shader>("Varjostimet/" + varjostin);
            if (s == null) return null;
            var m = new Material(s);
            roskat.Add(m);
            return m;
        }

        void Kappale(string nimi, Mesh mesh, Material m)
        {
            var go = new GameObject(nimi);
            go.transform.SetParent(transform, false);
            go.AddComponent<MeshFilter>().sharedMesh = mesh;
            var r = go.AddComponent<MeshRenderer>();
            r.sharedMaterial = m;
            r.shadowCastingMode = ShadowCastingMode.Off;
            r.receiveShadows = false;
        }

        void Alusta(Herays herays, string maakunta, List<Jarvikolmiot.Verkko> verkot, PalloKierto kierto)
        {
            h = herays;
            avain = maakunta;
            georeferenssi = kierto.georeferenssi;
            var m = h.Maakunta;

            // Täyttö: uinuva sävy (pysyvän täytön peitto × UinuvanPeitto) → tulva herääneeseen täyteen sävyyn.
            var (r, g, b, a) = Maakuntajako.Taytto(m.Varinumero, false, true);
            var tayteen = new Color((float)r, (float)g, (float)b).linear;
            var uinuva = tayteen;
            uinuva.a = (float)a * MaaKartta.UinuvanPeitto;
            var paikat = new List<Vector3>();
            var varit = new List<Color>();
            var suunnat = new List<Vector3>();
            var tiedot = new List<Vector3>();
            var korostus = new List<Vector3>();
            var kolmiot = new List<int>();
            foreach (var v in verkot)
            {
                int pohja = paikat.Count;
                foreach (var p in v.Karjet)
                {
                    paikat.Add(Paikka(p, 1500));
                    varit.Add(uinuva);
                    suunnat.Add(Suunta(p));
                    tiedot.Add(new Vector3(0, -10, (float)a));
                    korostus.Add(new Vector3(tayteen.r, tayteen.g, tayteen.b));
                }
                foreach (int i in v.Kolmiot) kolmiot.Add(pohja + i);
            }
            var pinta = new Mesh { name = "Herätys", indexFormat = IndexFormat.UInt32 };
            roskat.Add(pinta);
            pinta.SetVertices(paikat);
            pinta.SetColors(varit);
            pinta.SetUVs(0, suunnat);
            pinta.SetUVs(1, tiedot);
            pinta.SetUVs(2, korostus);
            pinta.SetTriangles(kolmiot, 0);
            pinta.RecalculateBounds();
            taytto = Materiaali("Maakuntapinta");
            if (taytto != null)
            {
                taytto.SetFloat("_Aika", 100);
                taytto.SetFloat("_Heraava", 0);
                taytto.SetVector("_TulvaKeskus", Suunta(h.Keskus));
                taytto.SetFloat("_TulvaReuna", (float)(4.0 / 6371));
                Kappale("Herätyksen täyttö", pinta, taytto);
            }

            // Mittakaava maakunnan koosta: nimen korkeus 8 % laatikon lävistäjästä (6–30 km).
            var kaikki = m.Renkaat.SelectMany(q => q).ToList();
            double lavistaja = Kameramatikka.KulmaAsteina(new LatLon(kaikki.Min(q => q.Lat), kaikki.Min(q => q.Lon)),
                new LatLon(kaikki.Max(q => q.Lat), kaikki.Max(q => q.Lon))) * ElavaKohtaus.KmAsteella;
            float korkeusKm = Mathf.Clamp((float)(lavistaja * 0.08), 6f, 30f);

            // Merkit ja napautuksen rengas: Laikka-neliöt (tila CPU:lta).
            laikat = Materiaali("Laikka");
            laikkaMesh = new Mesh { name = "Herätyksen merkit" };
            roskat.Add(laikkaMesh);
            var lp = new List<Vector3>(); var kulmat = new List<Vector2>(); var tx = new List<Vector3>(); var ty = new List<Vector3>();
            var siemen = new List<Vector2>(); var lk = new List<int>();
            var arpa = new System.Random(avain.GetHashCode());
            void Lisaa(LatLon p, float sadeM, float luokka)
            {
                var (ita, pohj, _) = Kanta(p);
                var c = Paikka(p, Nosto);
                int pohja = lp.Count;
                float s = (float)arpa.NextDouble();
                foreach (var k in new[] { new Vector2(-1, -1), new Vector2(1, -1), new Vector2(1, 1), new Vector2(-1, 1) })
                {
                    lp.Add(c); kulmat.Add(k); tx.Add(ita * sadeM); ty.Add(pohj * sadeM); siemen.Add(new Vector2(s, 0));
                    laikkaTila.Add(new Vector4(0, 0, 1, luokka));
                }
                lk.AddRange(new[] { pohja, pohja + 1, pohja + 2, pohja, pohja + 2, pohja + 3 });
            }
            Lisaa(h.Keskus, korkeusKm * 300f, 2);                        // rengas (vain roiske)
            int merkkeja = Math.Min(12, Math.Max(1, h.Kaikki));
            double vali = korkeusKm * 0.4 / ElavaKohtaus.KmAsteella;
            for (int i = 0; i < merkkeja; i++)
                Lisaa(new LatLon(m.Keskus.Lat - korkeusKm * 0.9 / ElavaKohtaus.KmAsteella, m.Keskus.Lon + (i - (merkkeja - 1) / 2.0) * vali), korkeusKm * 110f, 2);
            laikkaMesh.SetVertices(lp); laikkaMesh.SetUVs(0, kulmat); laikkaMesh.SetUVs(1, tx); laikkaMesh.SetUVs(2, ty);
            laikkaMesh.SetUVs(3, laikkaTila); laikkaMesh.SetUVs(4, siemen); laikkaMesh.SetTriangles(lk, 0);
            laikkaMesh.RecalculateBounds();
            var bb = laikkaMesh.bounds; bb.Expand(korkeusKm * 4000f); laikkaMesh.bounds = bb;
            if (laikat != null) Kappale("Herätyksen merkit", laikkaMesh, laikat);

            // Nimi käsialalla kartalla pohjoinen ylös (kuten videossa).
            var fontti = ElavaKartta.KasialaFontti();
            if (fontti != null)
            {
                var ngo = new GameObject("Maakunnan nimi");
                ngo.transform.SetParent(transform, false);
                nimi = ngo.AddComponent<TextMeshPro>();
                nimi.font = fontti;
                // Aineiston nimi voi olla tunnus ("FRA:Occitanie"): maatunnus pois.
                string teksti = m.Nimi ?? avain;
                int kaksoispiste = teksti.IndexOf(':');
                nimi.text = kaksoispiste >= 0 ? teksti.Substring(kaksoispiste + 1) : teksti;
                nimi.fontSize = 36;
                nimi.alignment = TextAlignmentOptions.Center;
                nimi.textWrappingMode = TextWrappingModes.NoWrap;
                nimi.color = new Color(0.22f, 0.15f, 0.09f, 1f);
                nimi.rectTransform.sizeDelta = new Vector2(120, 12);
                var mat = nimi.fontMaterial;
                mat.renderQueue = 3017;
                if (mat.HasProperty("_ZTestMode")) mat.SetFloat("_ZTestMode", (float)CompareFunction.Always);
                var (_, pohj2, ylos) = Kanta(m.Keskus);
                ngo.transform.localPosition = Paikka(m.Keskus, NimenNosto);
                ngo.transform.localRotation = Quaternion.LookRotation(-ylos, pohj2);
                ngo.transform.localScale = Vector3.one * (korkeusKm * 1000f / 3.6f);
                nimi.ForceMeshUpdate();
                nimenMinX = float.MaxValue; nimenMaxX = float.MinValue;
                var info = nimi.textInfo;
                for (int i = 0; i < info.characterCount; i++)
                {
                    var c = info.characterInfo[i];
                    if (!c.isVisible) continue;
                    nimenMinX = Mathf.Min(nimenMinX, c.bottomLeft.x);
                    nimenMaxX = Mathf.Max(nimenMaxX, c.topRight.x);
                }
            }
            Sovella(0);
        }

        void Update()
        {
            t += Time.unscaledDeltaTime;
            if (!luovutettu && t >= Herays.LuovutusAlku) { luovutettu = true; MaaKartta.Herata(avain, false); }
            if (t >= Herays.Kesto) { Destroy(gameObject); return; }
            Sovella(t);
        }

        void Sovella(double aika)
        {
            float peitto = (float)h.KerrostenPeitto(aika);
            if (taytto != null)
            {
                var (sade, valmis) = h.Tulva(aika);
                taytto.SetFloat("_TulvaSade", (float)(sade / 6371.0));
                taytto.SetFloat("_TulvaValmis", (float)valmis);
                taytto.SetFloat("_Peitto", peitto);
            }
            if (laikat != null && laikkaTila.Count > 0)
            {
                double rengas = h.Rengas(aika);
                for (int k = 0; k < 4; k++) laikkaTila[k] = new Vector4(1, rengas < 1 ? 0.9f : 0, (float)rengas, 2);
                var (mitta, merkki) = h.Merkit(aika);
                int merkkeja = laikkaTila.Count / 4 - 1;
                for (int j = 0; j < merkkeja; j++)
                    for (int k = 0; k < 4; k++)
                        laikkaTila[(j + 1) * 4 + k] = new Vector4((float)mitta, (float)merkki * (j < h.Loydetyt ? 0.95f : 0.28f), 1, 2);
                laikkaMesh.SetUVs(3, laikkaTila);
                laikat.SetFloat("_Peitto", peitto);
            }
            PaivitaNimi(h.NimiOsuus(aika), peitto);
        }

        void PaivitaNimi(double osuus, float peitto)
        {
            if (nimi == null || nimenMaxX <= nimenMinX) return;
            var info = nimi.textInfo;
            float pehmeys = (nimenMaxX - nimenMinX) * 0.08f;
            float kyna = Mathf.Lerp(nimenMinX - pehmeys, nimenMaxX + pehmeys, (float)osuus);
            for (int i = 0; i < info.characterCount; i++)
            {
                var c = info.characterInfo[i];
                if (!c.isVisible) continue;
                var varit = info.meshInfo[c.materialReferenceIndex].colors32;
                var kar = info.meshInfo[c.materialReferenceIndex].vertices;
                for (int k = 0; k < 4; k++)
                {
                    int vi = c.vertexIndex + k;
                    var v = varit[vi];
                    v.a = (byte)(255 * Mathf.Clamp01((kyna - kar[vi].x) / pehmeys) * peitto);
                    varit[vi] = v;
                }
            }
            nimi.UpdateVertexData(TMP_VertexDataUpdateFlags.Colors32);
        }

        void OnDestroy()
        {
            if (!luovutettu) MaaKartta.Herata(avain, false);
            foreach (var o in roskat) if (o != null) Destroy(o);
            if (nimi != null && nimi.fontMaterial != null) Destroy(nimi.fontMaterial);
        }
    }
}
