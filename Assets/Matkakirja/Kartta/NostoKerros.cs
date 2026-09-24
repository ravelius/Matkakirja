using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Matkakirja.Peli;
using Unity.Mathematics;
using UnityEngine;

namespace Matkakirja
{
    /// <summary>
    /// NOSTOKERROS (webin pallon nostot, js/pallolauta/nostot.js + js/fokuskohteet.js): nykyisen maan
    /// nostot kartalla. Tämä on kartan puoli: mitkä nostot näkyvät ja missä kohtaa ruutua. Natiivi-UI
    /// piirtää merkit (NostoMerkit-symbolit, nimiöt, ryhmät) ja avaa kortin napautuksesta.
    ///
    /// Webin säännöt:
    ///  - Nostot ovat nykyisen maan (pelaajan kaupungin maa; <see cref="Maa"/> voittaa) ja vain
    ///    pääkartan nostot (karttavalot.json paakartalla); lahizoom-nostot vain lähikuvassa.
    ///  - Kerros näkyy, kun maan leveys on vähintään <see cref="vahinOsuus"/> näkyvästä leveydestä
    ///    (LEHDEN_VAHIN_OSUUS 0,5: osuus, ei zoomitaso) ja saapumisesta on kulunut 1,4 s kameran
    ///    ja nappulan pysähdyttyä (saapumisPortti, PORTIN_VIIVE_MS). Syttyminen 0,7 s.
    ///  - Enintään <see cref="katto"/> nostoa kerrallaan, lähimmät ruudun keskeltä (NOSTOJEN_KATTO 120).
    /// Aineisto: kokoelmat/karttavalot.json (sama joukko kuin webin pallon nostokerros, skeema 1.24)
    /// ja maarajat.json:n bbox (maan leveys).
    /// </summary>
    public class NostoKerros : MonoBehaviour
    {
        public static NostoKerros Instanssi { get; private set; }

        public PalloKierto kierto;
        public KaupunkiMerkit merkit;
        public Nappula nappula;
        [Tooltip("LEHDEN_VAHIN_OSUUS: maan leveys / näkyvä leveys, jonka alla kerros on piilossa.")]
        public float vahinOsuus = 0.5f;
        [Tooltip("NOSTOJEN_KATTO: enintään näin monta nostoa kerrallaan.")]
        public int katto = 120;
        [Tooltip("PORTIN_VIIVE_MS: viive saapumisesta (kamera ja nappula paikallaan), sekunteina.")]
        public float porttiViive = 1.4f;
        [Tooltip("KOHTEIDEN_SYTTYMINEN_MS: syttymisen kesto sekunteina (Natiivi-UI lukee Syttyminen).")]
        public float syttyminenS = 0.7f;
        [Tooltip("lahizoom-nostot näkyvät vasta, kun näkyvä leveys on alle tämän (asteina).")]
        public double lahizoomLeveys = 4.0;

        public sealed class Nosto
        {
            public string Id, Tunnus, Aihe, Kategoria, Nimi, Nimio, Maa, KaupunkiAvain, TakyNosto;
            public double Lat, Lon;
            public int Taso, Tarkeys;
            public bool Lahizoom;
            /// <summary>Paikka ruudulla pikseleinä (origo vasen alakulma, kuten Input), päivitetään kehyksittäin.</summary>
            public Vector2 Ruutu;
            /// <summary>Etäisyys ruudun keskeltä pikseleinä (järjestys).</summary>
            public float Keskelta;
        }

        /// <summary>Pakotettu maa (ISO3) tai null = pelaajan kaupungin maa (nappulan lähin kaupunki).</summary>
        public string Maa { get; set; }
        /// <summary>Maa, jonka nostoja nyt näytetään (ISO3) tai null.</summary>
        public string NykyinenMaa { get; private set; }
        /// <summary>Kerros käytettävissä (osuus ja saapumisportti täyttyvät).</summary>
        public bool Nakyvissa { get; private set; }
        /// <summary>0→1 syttymisen aikana (Natiivi-UI:n peittävyys), 1 kun syttynyt.</summary>
        public float Syttyminen { get; private set; }
        /// <summary>Nykyisen maan leveys / näkyvä leveys (web osuus).</summary>
        public float Osuus { get; private set; }
        /// <summary>Lähizoomi auki (näkyvä leveys alle lahizoomLeveys): sama portti päästää lahizoom-nostot ja
        /// ryhmämerkkien nimiöt (web lahizoomiAuki / aihenostonNimioNakyy).</summary>
        public bool Lahella { get; private set; }
        /// <summary>Tämän kehyksen näytettävät nostot (ruudulla, edessä, lähimmät keskeltä, enintään katto).</summary>
        public IReadOnlyList<Nosto> Naytettavat => naytettavat;
        /// <summary>Herää, kun Naytettavat, Nakyvissa tai Syttyminen muuttui tässä kehyksessä.</summary>
        public event Action Paivittyi;
        public bool Valmis { get; private set; }

        /// <summary>
        /// LINSSINIMET (KarttaKerrokset.Nakyvyys("linssinimet"), RAJAPINTA luku 3c ja 4): linssin aikana nostot ja
        /// niiden nimet näkyvät kuten webissä, jossa nostotaso on poltettu maittain laattoihin (pelin repo
        /// js/pallolaatat.js:433–441 nostotMaittain, tools/generoi-laattapyramidi.mjs:430 NOSTOTASO) ja jää kartalle,
        /// kun elävät merkit piilotetaan (css/styles.css:11946 body.aikajana-paalla). Tila ohittaa saapumisportin
        /// (linssin kamera liikkuu) ja avaa <see cref="Lahella"/>-portin, jotta ryhmämerkkienkin nimet näkyvät ilman
        /// viuhkaa. Maa ja osuusportti pysyvät (web: kohdemaan laatasto tasoilta z5 alkaen). Natiivi-UI näyttää
        /// merkit linssin aikana tämän mukaan, ilman napautusta. KarttaKerrokset asettaa tämän.
        /// </summary>
        public bool LinssiNimet
        {
            get => linssiNimet;
            set
            {
                if (linssiNimet == value) return;
                linssiNimet = value;
                muuttui = nakymaMuuttui = true;
            }
        }
        bool linssiNimet;

        readonly Dictionary<string, List<Nosto>> maittain = new Dictionary<string, List<Nosto>>();
        readonly Dictionary<string, double4> bboxit = new Dictionary<string, double4>(); // länsi, etelä, itä, pohjoinen
        readonly List<Nosto> naytettavat = new List<Nosto>();
        float pysahtyi = -1f, sytytysAlku = -1f;
        string edellinenMaa;
        bool muuttui;

        bool nakymaMuuttui;

        void Awake() => Instanssi = this;
        void OnDestroy()
        {
            if (Instanssi == this) Instanssi = null;
            if (kierto != null) kierto.NakymaMuuttui -= Muuttui;
        }
        void Start()
        {
            if (kierto != null) kierto.NakymaMuuttui += Muuttui;
            StartCoroutine(Lataa());
        }
        void Muuttui() => nakymaMuuttui = true;

        IEnumerator Lataa()
        {
            string valot = null, rajat = null;
            yield return Sisalto.HaeTeksti("karttavalot", t => valot = t, true);
            yield return Sisalto.HaeTeksti("maarajat", t => rajat = t, true);
            if (valot == null) { Debug.LogWarning("MATKAKIRJA nostot: karttavalot.json puuttuu"); yield break; }
            var tehtava = Task.Run(() => Jasenna(valot, rajat));
            while (!tehtava.IsCompleted) yield return null;
            if (tehtava.IsFaulted) { Debug.LogError("MATKAKIRJA nostot: " + tehtava.Exception?.GetBaseException()); yield break; }
            int n = 0;
            foreach (var l in maittain.Values) n += l.Count;
            Valmis = true;
            Debug.Log($"MATKAKIRJA nostot: {n} pääkartan nostoa {maittain.Count} maassa, {bboxit.Count} maan rajat");
        }

        void Jasenna(string valot, string rajat)
        {
            if (MiniJson.Jasenna(valot) is Dictionary<string, object> juuri && juuri.GetValueOrDefault("alkiot") is List<object> alkiot)
            {
                foreach (var o in alkiot)
                {
                    if (!(o is Dictionary<string, object> a)) continue;
                    if (a.GetValueOrDefault("paakartalla") is bool pk && !pk) continue;
                    var ladottu = MiniJson.Kentta(a, "ladottu") as Dictionary<string, object>;
                    var s = new Nosto
                    {
                        Id = MiniJson.Teksti(a, "id"),
                        Tunnus = MiniJson.Teksti(a, "tunnus"),
                        Aihe = MiniJson.Teksti(a, "aihe"),
                        Kategoria = MiniJson.Teksti(a, "kategoria"),
                        Nimi = MiniJson.Teksti(a, "nimi"),
                        Nimio = MiniJson.Teksti(a, "nimio"),
                        Maa = MiniJson.Teksti(a, "maa"),
                        KaupunkiAvain = MiniJson.Teksti(a, "kaupunkiAvain"),
                        TakyNosto = MiniJson.Teksti(a, "takynosto"),
                        Lat = (ladottu != null ? MiniJson.Luku(ladottu, "lat") : null) ?? MiniJson.Luku(a, "lat") ?? 0,
                        Lon = (ladottu != null ? MiniJson.Luku(ladottu, "lon") : null) ?? MiniJson.Luku(a, "lon") ?? 0,
                        Taso = (int)(MiniJson.Luku(a, "taso") ?? 1),
                        Tarkeys = (int)(MiniJson.Luku(a, "tarkeys") ?? 1),
                        Lahizoom = a.GetValueOrDefault("lahizoom") is bool lz && lz,
                    };
                    if (s.Id == null || s.Maa == null) continue;
                    if (!maittain.TryGetValue(s.Maa, out var l)) maittain[s.Maa] = l = new List<Nosto>();
                    l.Add(s);
                }
            }
            if (rajat != null && MiniJson.Jasenna(rajat) is Dictionary<string, object> r && r.GetValueOrDefault("alkiot") is List<object> maat)
            {
                foreach (var o in maat)
                {
                    if (!(o is Dictionary<string, object> m) || !(MiniJson.Kentta(m, "bbox") is List<object> b) || b.Count < 4) continue;
                    string id = MiniJson.Teksti(m, "id");
                    if (id != null)
                        bboxit[id] = new double4(Convert.ToDouble(b[0]), Convert.ToDouble(b[1]), Convert.ToDouble(b[2]), Convert.ToDouble(b[3]));
                }
            }
        }

        string PelaajanMaa()
        {
            if (!string.IsNullOrEmpty(Maa)) return Maa;
            if (nappula == null || merkit == null) return null;
            string id = merkit.LahinId(nappula.Lat, nappula.Lon, 0.3);
            return id != null ? merkit.KaupunginMaa(id) : null;
        }

        void LateUpdate()
        {
            if (!Valmis || kierto == null) return;
            string maa = PelaajanMaa();
            if (maa != edellinenMaa)
            {
                edellinenMaa = maa;
                NykyinenMaa = maa;
                pysahtyi = -1f;
                sytytysAlku = -1f;
                muuttui = true;
            }

            // Osuus: maan leveys (bbox, lon × cos lat) / näkyvä vaakaleveys asteina.
            double nakyvaLeveys = NakyvaLeveysAsteina();
            Osuus = 0;
            if (maa != null)
            {
                double4 bb;
                if (!bboxit.TryGetValue(maa, out bb) && maittain.TryGetValue(maa, out var lista)) bb = PisteidenBbox(lista);
                double leveys = math.abs(bb.z - bb.x) * math.cos(math.radians((bb.y + bb.w) * 0.5));
                Osuus = nakyvaLeveys > 0 ? (float)(leveys / nakyvaLeveys) : 0;
            }

            // Saapumisportti: kamera ja nappula paikallaan porttiViiveen ajan (web saapumisPortti).
            bool liikkuu = kierto.Liikkeessa || (nappula != null && nappula.Vaihe != LennonVaihe.Ei) || (nappula != null && nappula.Liikkeessa);
            if (liikkuu) { if (!Nakyvissa) pysahtyi = -1f; }
            else if (pysahtyi < 0) pysahtyi = Time.unscaledTime;
            bool porttiAuki = linssiNimet || Nakyvissa || (pysahtyi >= 0 && Time.unscaledTime - pysahtyi >= porttiViive);

            // Aloitusportissa (PalloKierto.PorttiSumea) ei nostoja: UI piirtäisi ne terävinä sumean pallon päälle.
            bool nakyvissa = maa != null && Osuus >= vahinOsuus && porttiAuki && !PalloKierto.PorttiSumea;
            if (nakyvissa != Nakyvissa)
            {
                Nakyvissa = nakyvissa;
                sytytysAlku = nakyvissa ? Time.unscaledTime : -1f;
                int n = maa != null && maittain.TryGetValue(maa, out var kaikki) ? kaikki.Count : 0;
                Debug.Log($"MATKAKIRJA nostot: {(nakyvissa ? "näkyvissä" : "piilossa")} {maa}, osuus {Osuus:F2}, maan nostoja {n}");
                muuttui = true;
            }
            float sytty = Nakyvissa ? Mathf.Clamp01(sytytysAlku < 0 ? 1f : (Time.unscaledTime - sytytysAlku) / Mathf.Max(0.01f, syttyminenS)) : 0f;
            if (sytty != Syttyminen) { Syttyminen = sytty; muuttui = true; }

            if (Nakyvissa && maittain.TryGetValue(maa, out var nostot))
            {
                if (nakymaMuuttui || muuttui || naytettavat.Count == 0) Paivita(nostot, nakyvaLeveys);
            }
            else if (naytettavat.Count > 0) { naytettavat.Clear(); muuttui = true; }

            nakymaMuuttui = false;
            if (muuttui) { muuttui = false; Paivittyi?.Invoke(); }
        }

        void Paivita(List<Nosto> nostot, double nakyvaLeveys)
        {
            naytettavat.Clear();
            var keski = new Vector2(Screen.width * 0.5f, Screen.height * 0.5f);
            bool lahi = nakyvaLeveys < lahizoomLeveys;
            // Linssinimissä ryhmänkin nimi näkyy (web: poltettu nimiö ei ryhmity); lahizoom-nostot yhä vain lähellä.
            Lahella = lahi || linssiNimet;
            foreach (var s in nostot)
            {
                if (s.Lahizoom && !lahi) continue;
                if (!kierto.RuutuPiste(s.Lat, s.Lon, out var r)) continue;
                s.Ruutu = r;
                s.Keskelta = Vector2.Distance(r, keski);
                naytettavat.Add(s);
            }
            if (naytettavat.Count > katto)
            {
                naytettavat.Sort((a, b) => a.Keskelta.CompareTo(b.Keskelta));
                naytettavat.RemoveRange(katto, naytettavat.Count - katto);
            }
            muuttui = true;
        }

        double NakyvaLeveysAsteina()
        {
            var kamera = kierto.GetComponent<Camera>();
            if (kamera == null) return 0;
            double pysty = math.radians(kamera.fieldOfView) * 0.5;
            double vaaka = math.atan(math.tan(pysty) * kamera.aspect);
            // Kaari, joka näkyy vaakasuunnassa korkeudelta (pieni kulma: 2·h·tan / R, rajattu puolipalloon).
            double r = 6371000.0;
            return math.degrees(math.min(math.PI, 2.0 * kierto.korkeus * math.tan(vaaka) / r));
        }

        static double4 PisteidenBbox(List<Nosto> l)
        {
            var bb = new double4(180, 90, -180, -90);
            foreach (var s in l) bb = new double4(math.min(bb.x, s.Lon), math.min(bb.y, s.Lat), math.max(bb.z, s.Lon), math.max(bb.w, s.Lat));
            return bb;
        }
    }
}
